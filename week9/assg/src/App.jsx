import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import "./styles.css";
import Wonder from "./Wonder";

import greatWallImg from "./assets/great-wall.jpg";
import petraImg from "./assets/petra.jpg";
import colosseumImg from "./assets/colosseum.jpg";
import chichenItzaImg from "./assets/chichen-itza.jpg";
import machuPicchuImg from "./assets/machu-picchu.jpg";
import tajMahalImg from "./assets/taj-mahal.jpg";
import christImg from "./assets/christ-the-redeemer.jpg";

const initialWonders = [
  {
    id: nanoid(),
    name: "Great Wall of China",
    location: "China",
    year: "700 BCE",
    image: greatWallImg,
    fact: "A massive wall system built across northern China over many centuries.",
    ancient: true
  },
  {
    id: nanoid(),
    name: "Petra",
    location: "Ma'an, Jordan",
    year: "312 BCE",
    image: petraImg,
    fact: "An ancient city famous for rock-cut architecture and rose-colored stone.",
    ancient: true
  },
  {
    id: nanoid(),
    name: "Colosseum",
    location: "Rome, Italy",
    year: "80 CE",
    image: colosseumImg,
    fact: "The largest amphitheater of the Roman Empire, used for public spectacles.",
    ancient: true
  },
  {
    id: nanoid(),
    name: "Chichen Itza",
    location: "Yucatán, Mexico",
    year: "600 CE",
    image: chichenItzaImg,
    fact: "A major Maya city best known for the pyramid El Castillo.",
    ancient: false
  },
  {
    id: nanoid(),
    name: "Machu Picchu",
    location: "Cuzco Region, Peru",
    year: "1450 CE",
    image: machuPicchuImg,
    fact: "An Inca mountain citadel set high in the Andes.",
    ancient: false
  },
  {
    id: nanoid(),
    name: "Taj Mahal",
    location: "Agra, India",
    year: "1643 CE",
    image: tajMahalImg,
    fact: "A white marble mausoleum built by Shah Jahan for Mumtaz Mahal.",
    ancient: false
  },
  {
    id: nanoid(),
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    year: "1931 CE",
    image: christImg,
    fact: "A monumental statue standing atop Corcovado Mountain overlooking Rio.",
    ancient: false
  }
];

function NewWonderForm({ addWonderFn }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      year: "",
      fact: "",
      ancient: false,
      imageFile: null
    }
  });

  const [formMessage, setFormMessage] = useState("");
  const fileInputRef = useRef(null);

  function convertFileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read image file."));
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmitJob(data) {
    setFormMessage("");
    clearErrors("root");

    const filledRequiredCount = [data.name, data.location].filter(
      (value) => value && value.trim() !== ""
    ).length;

    if (filledRequiredCount < 2) {
      setError("root", {
        type: "manual",
        message: "Please fill in at least two required fields: name and location."
      });
      return;
    }

    const uploadedFile = data.imageFile?.[0] || null;

    if (uploadedFile && uploadedFile.size >= 1024 * 1024) {
      setError("imageFile", {
        type: "manual",
        message: "Image must be smaller than 1 MB."
      });
      return;
    }

    let imageSrc = "";
    if (uploadedFile) {
      imageSrc = await convertFileToDataUrl(uploadedFile);
    }

    const newWonder = {
      name: data.name.trim(),
      location: data.location.trim(),
      year: data.year.trim(),
      fact: data.fact.trim(),
      image: imageSrc,
      ancient: data.ancient
    };

    addWonderFn(newWonder);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormMessage("New wonder added successfully.");
  }

  return (
    <div className="form-wrapper">
      <h2>Add Your Own Wonder</h2>
      <form onSubmit={handleSubmit(handleSubmitJob)} className="wonder-form">
        <div className="form-group">
          <label htmlFor="name">Wonder Name *</label>
          <input
            id="name"
            type="text"
            placeholder="Enter wonder name"
            {...register("name")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            placeholder="Enter location"
            {...register("location")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="text"
            placeholder="Example: 250 BCE or 2026 CE"
            {...register("year")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fact">Key Fact</label>
          <textarea
            id="fact"
            rows="4"
            placeholder="Write a short fact about the wonder"
            {...register("fact")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageFile">Upload Image (less than 1 MB)</label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            {...register("imageFile", {
              validate: {
                fileSize: (files) => {
                  if (!files || files.length === 0) return true;
                  return files[0].size < 1024 * 1024 || "Image must be smaller than 1 MB.";
                }
              }
            })}
          />
          {errors.imageFile && (
            <p className="form-error">{errors.imageFile.message}</p>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="ancient">
            <input id="ancient" type="checkbox" {...register("ancient")} />
            Mark as ancient/historic period
          </label>
        </div>

        {errors.root && <p className="form-error">{errors.root.message}</p>}
        {formMessage && <p className="form-success">{formMessage}</p>}

        <button type="submit">Add Wonder</button>
      </form>
    </div>
  );
}

function App() {
  const [wonders, setWonders] = useState(initialWonders);
  const [sortOrder, setSortOrder] = useState("default");

  function deleteWonder(id) {
    setWonders((currentWonders) =>
      currentWonders.filter((wonder) => wonder.id !== id)
    );
  }

  function duplicateWonder(id) {
    setWonders((currentWonders) => {
      const wonderToDuplicate = currentWonders.find(
        (wonder) => wonder.id === id
      );
        
      if (!wonderToDuplicate) {
        return currentWonders;
      }

      const wonderIndex = currentWonders.findIndex(
        (wonder) => wonder.id === id
      );

      const duplicatedWonder = {
        ...wonderToDuplicate,
        id: nanoid(),
        name: `${wonderToDuplicate.name} Copy`
      };

      return [
        ...currentWonders.slice(0, wonderIndex + 1),
        duplicatedWonder,
        ...currentWonders.slice(wonderIndex + 1)
      ];
    });    
  }

  function resetWonders() {
  setWonders(initialWonders.map((wonder) => ({ ...wonder, id: nanoid() })));
  setSortOrder("default");
  } 

  function addWonderFn(data) {
    const newWonder = {
      id: nanoid(),
      name: data.name || "Untitled Wonder",
      location: data.location || "Unknown location",
      year: data.year || "Unknown year",
      fact: data.fact || "No fact provided yet.",
      image: data.image || "https://via.placeholder.com/800x500?text=No+Image",
      ancient: data.ancient || false
    };

    setWonders((currentWonders) => [...currentWonders, newWonder]);
  }

  const displayedWonders = [...wonders];

  if (sortOrder === "az") {
    displayedWonders.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "za") {
    displayedWonders.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="App">
      <header className="page-header">
        <h1>Beyond Seven Wonders</h1>
        <p className="intro">
          This collection highlights the seven monuments selected in the 2007 New Seven Wonders campaign. Each card presents the wonder's image, location, year, and a key fact. You are invited to upload a wonder you believe deserves a place among the top ten. Use the buttons to duplicate or remove a card.
        </p>
        <p className="legend">
          <span className="legend-box"></span>
          Highlighted cards mark wonders from ancient historic periods.
        </p>

        <div className="top-controls">
          <button
            type="button"
            className="reset-button"
            onClick={resetWonders}
          >
            Reset
          </button>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="az">Sort A–Z</option>
            <option value="za">Sort Z–A</option>
          </select>
        </div>
      </header>
      
      {displayedWonders.length === 0 ? (
        <p className="empty-message">No wonders left in the collection.</p>
      ) : (
        <section className="wonder-list">
          {displayedWonders.map((wonder) => (
            <Wonder 
              key={wonder.id}
              wonder={wonder}
              deleteWonder={deleteWonder}
              duplicateWonder={duplicateWonder} 
            />
          ))}
        </section>
      )}

      <NewWonderForm addWonderFn={addWonderFn} />
    </div>
  );
}

export default App;