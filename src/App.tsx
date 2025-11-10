import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthenticator } from "@aws-amplify/ui-react";
//import { generateClient } from "aws-amplify/data";
//import type { Schema } from "../amplify/data/resource";
//import Storage from "aws-amplify/storage";
//import { Storage } from "@aws-amplify/storage";
//import * as AmplifyModules from "aws-amplify";
//const { Storage } = AmplifyModules;
import { uploadData, TransferProgressEvent } from "aws-amplify/storage";
import { DataStore } from "aws-amplify/datastore";
import { TenantApplication } from "./models";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateTenantApplication } from "./graphql/subscriptions";


//const client = generateClient<Schema>();

const tenantSchema = yup.object({
  adults: yup.array().of(
    yup.object({
      firstName: yup.string().required("First name required"),
      lastName: yup.string().required("Last name required"),
      email: yup.string().email("Invalid email").nullable(),
      phone: yup.string().nullable(),
      ssn: yup.string().nullable(),
    })
  ).min(1),
  leaseTerm: yup.string().required(),
  household: yup.object({
    adults: yup.number().required(),
    children: yup.number().required(),
  }),
  rentalHistory: yup.array().of(
    yup.object({
      address: yup.string().nullable(),
      from: yup.string().nullable(),
      to: yup.string().nullable(),
      contactName: yup.string().nullable(),
      contactPhone: yup.string().nullable(),
      contactEmail: yup.string().nullable(),
    })
  ),
  employmentHistory: yup.array().of(
    yup.object({
      employer: yup.string().nullable(),
      from: yup.string().nullable(),
      to: yup.string().nullable(),
      supervisorName: yup.string().nullable(),
      supervisorPhone: yup.string().nullable(),
      supervisorEmail: yup.string().nullable(),
    })
  ),
  files: yup.mixed(),
});

type FormValues = yup.InferType<typeof tenantSchema>;

function App() {
  const { signOut, user } = useAuthenticator();
  const [uploading, setUploading] = useState(false);

  const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      adults: [{ firstName: "", lastName: "", email: "", phone: "", ssn: "" }],
      leaseTerm: "12",
      household: { adults: 1, children: 0 },
      rentalHistory: [],
      employmentHistory: [],
      files: [],
    },
    resolver: yupResolver(tenantSchema),
  });

  const { fields: adultFields, append: appendAdult } = useFieldArray({ control, name: "adults" });
  const { fields: rentalFields, append: appendRental } = useFieldArray({ control, name: "rentalHistory" });
  const { fields: employmentFields, append: appendEmployment } = useFieldArray({ control, name: "employmentHistory" });

  const [openAdults, setOpenAdults] = useState(true);
  const [openRental, setOpenRental] = useState(false);
  const [openEmployment, setOpenEmployment] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setUploading(true);
      const uploadedFiles: string[] = [];

      //if (data.files && data.files.length) {   //REPLACED THIS BLOCK WITH THE BLOCK BELOW FROM LINE#93-127.
        //for (const file of data.files) {		 //TO OVERCOME THE ISSUE OF THE STORAGE.PUT NOT WORKING WITH V5.
          //const key = await Storage.put(file.name, file);
          //uploadedFiles.push(key.key);
        //}
      //}
	  
	  if (data.files && data.files.length) {
		const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

		for (const file of data.files) {
			if (!allowedTypes.includes(file.type)) {
				alert(`Invalid file type: ${file.name}. Please upload only PNG or JPG images.`);
				continue;
			}

			// Create a unique key for each file (username + timestamp + original name)
			const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
			const fileKey = `${user?.username || "anonymous"}/${timestamp}_${file.name}`;

			try {
				const uploadResult = await uploadData({
					key: fileKey,
					data: file,
					options: {
						onProgress: ({ transferredBytes, totalBytes }: TransferProgressEvent) => {
							if (totalBytes) {
								const progress = Math.round((transferredBytes / totalBytes) * 100);
								console.log(`Uploading ${file.name}: ${progress}%`);
							}
						},
					},
				}).result;

				console.log("Upload successful:", uploadResult);
				uploadedFiles.push(uploadResult.key);
			} catch (error) {
				console.error("Upload error:", error);
				alert(`Upload failed for ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
			}
		}
	  }

	  
	  //if (data.files?.length) {
		//if (!Storage?.put) {
			//console.error("Storage.put is not available! Check your import and Amplify configuration.");
			//return;
		//}

		//for (const file of data.files) {
			//const key = await Storage.put(file.name, file);
			//uploadedFiles.push(key.key);
		//}
	  //}

	  // --- Save textual data ---
      //await client.models.TenantApplication.create({
        //adults: data.adults,
        //leaseTerm: data.leaseTerm,
        //household: data.household,
        //rentalHistory: data.rentalHistory,
        //employmentHistory: data.employmentHistory,
        //uploadedFiles,
      //});
	  
	  await DataStore.save(
		new TenantApplication({
			adults: JSON.stringify(data.adults),
			leaseTerm: data.leaseTerm,
			household: JSON.stringify(data.household),
			rentalHistory: JSON.stringify(data.rentalHistory),
			employmentHistory: JSON.stringify(data.employmentHistory),
			uploadedFiles,
		})
	  );

      alert("Tenant application submitted!");
	  console.log("Saved to DynamoDB!");
    } catch (error) {
	  console.error("Error saving application:", error);
      alert("Error saving application. Check console for details.");
	}
	finally {
      setUploading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tenant Application Form</h1>
      <p className="mb-6">Logged in as <strong>{user?.username}</strong></p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* --- Adults Section --- */}
        <div className="border rounded p-4 shadow">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenAdults(!openAdults)}>
            <h2 className="text-xl font-semibold">Potential Tenant Information</h2>
            <span>{openAdults ? "▼" : "▶"}</span>
          </div>
          {openAdults && (
            <div className="mt-4 space-y-4">
              {adultFields.map((field, idx) => (
                <div key={field.id} className="border p-3 rounded space-y-2">
                  <h3 className="font-semibold">Adult {idx + 1}</h3>
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="First Name"
                    {...register(`adults.${idx}.firstName` as const)}
                  />
                  {errors.adults?.[idx]?.firstName && <p className="text-red-500">{errors.adults[idx].firstName?.message}</p>}
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Last Name"
                    {...register(`adults.${idx}.lastName` as const)}
                  />
                  {errors.adults?.[idx]?.lastName && <p className="text-red-500">{errors.adults[idx].lastName?.message}</p>}
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                    {...register(`adults.${idx}.email` as const)}
                  />
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Phone"
                    {...register(`adults.${idx}.phone` as const)}
                  />
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="SSN"
                    {...register(`adults.${idx}.ssn` as const)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendAdult({ firstName: "", lastName: "", email: "", phone: "", ssn: "" })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Add another adult
              </button>
            </div>
          )}
        </div>

        {/* --- Lease Information --- */}
        <div className="border rounded p-4 shadow space-y-2">
          <h2 className="text-xl font-semibold">Lease Info</h2>
          <select className="w-full border p-2 rounded" {...register("leaseTerm")}>
            <option value="12">12 months</option>
            <option value="18">18 months</option>
            <option value="24">24+ months</option>
          </select>
        </div>
		
		{/* --- Household Information --- */}
		<div className="border rounded p-4 shadow space-y-4">
			<h2 className="text-xl font-semibold">Household Info</h2>

			<div className="flex items-center space-x-4">
				<label className="w-48 font-medium" htmlFor="household-adults">
					Number of Adults in the household?
				</label>
				<select
					id="household-adults"
					className="flex-1 border p-2 rounded"
					{...register("household.adults")}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3+</option>
				</select>
			</div>

			<div className="flex items-center space-x-4">
				<label className="w-48 font-medium" htmlFor="household-children">
					Number of Children in the household?
				</label>
				<select
					id="household-children"
					className="flex-1 border p-2 rounded"
					{...register("household.children")}
				>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3+</option>
				</select>
			</div>
		</div>

        {/* --- Rental History --- */}
        <div className="border rounded p-4 shadow">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenRental(!openRental)}>
            <h2 className="text-xl font-semibold">Rental History (Optional)</h2>
            <span>{openRental ? "▼" : "▶"}</span>
          </div>
          {openRental && (
            <div className="mt-4 space-y-4">
              {rentalFields.map((field, idx) => (
                <div key={field.id} className="border p-3 rounded space-y-2">
                  <h3 className="font-semibold">Rental {idx + 1}</h3>
                  <input placeholder="Address" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.address` as const)} />
                  <input type="month" placeholder="From" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.from` as const)} />
                  <input type="month" placeholder="To" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.to` as const)} />
                  <input placeholder="Contact Name" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.contactName` as const)} />
                  <input placeholder="Contact Phone" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.contactPhone` as const)} />
                  <input placeholder="Contact Email" className="w-full border p-2 rounded" {...register(`rentalHistory.${idx}.contactEmail` as const)} />
                </div>
              ))}
              {rentalFields.length < 3 && (
                <button type="button" onClick={() => appendRental({ address: "", from: "", to: "" })} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  + Add rental history
                </button>
              )}
            </div>
          )}
        </div>

        {/* --- Employment History --- */}
        <div className="border rounded p-4 shadow">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenEmployment(!openEmployment)}>
            <h2 className="text-xl font-semibold">Employment History (Optional)</h2>
            <span>{openEmployment ? "▼" : "▶"}</span>
          </div>
          {openEmployment && (
            <div className="mt-4 space-y-4">
              {employmentFields.map((field, idx) => (
                <div key={field.id} className="border p-3 rounded space-y-2">
                  <h3 className="font-semibold">Employment {idx + 1}</h3>
                  <input placeholder="Employer" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.employer` as const)} />
                  <input type="month" placeholder="From" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.from` as const)} />
                  <input type="month" placeholder="To" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.to` as const)} />
                  <input placeholder="Supervisor Name" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.supervisorName` as const)} />
                  <input placeholder="Supervisor Phone" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.supervisorPhone` as const)} />
                  <input placeholder="Supervisor Email" className="w-full border p-2 rounded" {...register(`employmentHistory.${idx}.supervisorEmail` as const)} />
                </div>
              ))}
              {employmentFields.length < 3 && (
                <button type="button" onClick={() => appendEmployment({ employer: "", from: "", to: "" })} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                  + Add employment history
                </button>
              )}
            </div>
          )}
        </div>

        {/* --- File Upload --- */}
        <div className="border rounded p-4 shadow space-y-2">
          <h2 className="text-xl font-semibold">File Upload (up to 4 files)</h2>
          <Controller
            control={control}
            name="files"
            render={({ field }) => (
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files ? Array.from(e.target.files).slice(0, 4) : [];
                  field.onChange(files);
                }}
                className="w-full"
              />
            )}
          />
        </div>

        <button type="submit" disabled={uploading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          {uploading ? "Uploading..." : "Submit Application"}
        </button>
      </form>

      <button onClick={signOut} className="mt-4 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700">
        Sign Out
      </button>
    </main>
  );
  
  useEffect(() => {
    // Subscribe to new TenantApplications
    const subscription = DataStore.observe(TenantApplication).subscribe(msg => {
      if (msg.opType === "INSERT") {
        const app = msg.element;
        console.log("New tenant application received:");
        console.log("ID:", app.id);
        console.log("Adults:", app.adults);
        console.log("Household:", app.household);
        console.log("Rental History:", app.rentalHistory);
        console.log("Employment History:", app.employmentHistory);
        console.log("Uploaded Files:", app.uploadedFiles);
      }
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, []); // empty dependency array → runs once on mount

  return (
    <main>
      {/* ... your existing JSX */}
    </main>
  );
}

export default App;
