
import './App.css';
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, watch, reset, formState:{errors} } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      state: "",
      country: "",
      favColor: [],
      bio: "",
    },
  });

  const formData = watch();

  function handleMyForm(data) {
    console.log("Submitted data", data);
    reset();
  }

  return (
    <div className="app">
      <div className="form-card">
        <h1>Alpaca Fan Club Registration Form</h1>
        <p className="subtitle">Join the fluffiest fan club on earth.</p>

        <form onSubmit={handleSubmit(handleMyForm)}>
          <fieldset>
            <legend>Personal Information</legend>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" }
                })}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
              <p className="form-error">{errors.firstName.message}</p>
              )}

            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 characters"}
                })}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
              <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="streetAddress">Street Address</label>
              <input 
                type="text" 
                id="streetAddress" 
                {...register("streetAddress", {
                  required: "Address is required",
                  minLength: { value: 5, message: "Too short" }
                })}
                placeholder="123 Alpaca Avenue"
              />
              {errors.streetAddress && (
                <p className="form-error">{errors.streetAddress.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">State / Province</label>
              <select id="state" {...register("state")}>
                <option value="">Select one</option>
                <option value="AK">Alaska</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="MN">Minnesota</option>
                <option value="WI">Wisconsin</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input 
                type="text" 
                id="country" 
                {...register("country", {
                  required: "Country is required"
                })}
                placeholder="Enter your country"
              />
              {errors.country && (
                <p className="form-error">{errors.country.message}</p>
              )}
            </div>

            <div className='form-group'>
              <p className="group-label">Favorite Alpaca Colors</p>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" value="Red" {...register("favColor")} />
                  Red
                </label>
                <label>
                  <input type="checkbox" value="Green" {...register("favColor")} />
                  Green
                </label>
                <label>
                  <input type="checkbox" value="Blue" {...register("favColor")} />
                  Blue
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Tell us about yourself</label>
              <textarea 
                rows="8" 
                id="bio" 
                {...register("bio")}
                placeholder="Share your alpaca enthusiasm..."
              ></textarea>
            </div>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="preview-card">
        <h2>Live Form Preview</h2>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Street Address:</strong> {formData.streetAddress}</p>
        <p><strong>State / Province:</strong> {formData.state}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p>
          <strong>Favorite Alpaca Colors:</strong>{" "}
          {formData.favColor?.length ? formData.favColor.join(", ") : "None selected"}
        </p>
        <p><strong>About You:</strong> {formData.bio}</p>
      </div>
    </div>
  );    
}

export default App;
