import { z } from "zod";
import { useUploadMultipleFilesMutation } from "@/src/store/api/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/core/form";
import { TAmbassador } from "@/src/store/types/ambassadors";
import TextInput from "@/src/components/core/text-input";
import ScrollArea from "@/src/components/core/scroll-area";
import Select from "@/src/components/core/select";
import ImageInput from "@/src/components/core/image-input";
import { Button } from "@/src/components/core/button";
import { handleApiErrors } from "@/src/store/api/helper";

type AmbassadorFormProps = {
  type: "add" | "edit";
  ambassador: TAmbassador;
  close: () => void;
};

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    address: z.string().min(10, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email("This is not a valid email."),
    gender: z.string().min(1, { message: "Required" }),
    phone: z
      .string()
      .min(11, { message: "Required" })
      .max(11, { message: "Required" }),
    idCard: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    passportPhotograph: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    storeFrontView: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    storeInsideView: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    storeStreetView: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    storeAddressProof: z.any().refine(
      (data) => {
        if (!data) {
          return false;
        }
        return true;
      },
      { message: "Required" },
    ),
    storeCACRegistration: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (!/^\d{11}$/.test(data.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
        path: ["phone"],
      });
    }
  });

export default function AmbassadorForm({
  close,
  type,
  ambassador,
}: AmbassadorFormProps) {
  const [uploadFile, { isLoading: isUploadingFile }] =
    useUploadMultipleFilesMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      gender: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const images = [
      values.idCard,
      values.passportPhotograph,
      values.storeFrontView,
      values.storeInsideView,
      values.storeStreetView,
      values.storeAddressProof,
      values.storeCACRegistration,
    ];

    // BLOCKED BY BACKEND
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("files", file);
    });

    await uploadFile({ files: formData })
      .then((res: any) => {
        // imgUrls = res?.data;
        console.log(res);
      })
      .catch((err) => handleApiErrors(err));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between">
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          {type === "add" ? "Add New" : "Edit"} Ambassador
        </h2>

        <ScrollArea className="h-full w-full px-5 py-8">
          <div className="space-y-6">
            <div className="space-y-8 sm:flex sm:items-start sm:space-x-3 sm:space-y-0">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <TextInput
                        placeholder="Enter First Name"
                        label="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <TextInput
                        placeholder="Enter Last Name"
                        label="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      placeholder="Enter Email"
                      label="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      placeholder="Enter Address"
                      label="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      placeholder="Enter Phone Number"
                      label="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Gender"
                      label="Gender"
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 sm:gap-8">
              <FormField
                control={form.control}
                name="idCard"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="ID Card"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passportPhotograph"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="Passport Photograph"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeAddressProof"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="Store Address Proof"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeFrontView"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="Store Front View"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeInsideView"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="Store Inside View"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeStreetView"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageInput
                        label="Store Street View"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeCACRegistration"
                render={({ field }) => (
                  <FormItem className="w-full xs:col-span-3">
                    <FormControl>
                      <ImageInput
                        label="Store CAC Registration (Optional)"
                        image={field.value}
                        handleImageChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ScrollArea>
        <div className="px-5 py-2 lg:py-4">
          <Button className="h-12 w-full">Add Ambassador</Button>
        </div>
      </form>
    </Form>
  );
}
