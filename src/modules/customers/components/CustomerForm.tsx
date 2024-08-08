import { Button } from "@/src/components/core/button";
import CustomSelect from "@/src/components/core/custom-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/core/form";
import ScrollArea from "@/src/components/core/scroll-area";
import TextInput from "@/src/components/core/text-input";
import FileInput from "@/src/components/core/upload-file-input";
import {
  useAddCustomerMutation,
  useEditCustomerMutation,
  useGetCustomerByIdQuery,
} from "@/src/store/api/customer";
import {
  handleApiErrors,
  handleApiSuccessResponse,
} from "@/src/store/api/helper";
import {
  TCustomer,
  TGetCustomerByIdResponse,
} from "@/src/store/types/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TCustomerFormProps = {
  type: "edit" | "add";
  customer: TCustomer;
  close: () => void;
};
const formSchema = z.object({
  firstName: z.string().min(4, { message: "Required" }),
  lastName: z.string().min(4, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  role: z.string({ message: "Required" }),
  address: z.string().min(10, { message: "Invalid address" }),
  gender: z.string({ message: "Required" }),
  phoneNumber: z
    .string()
    .min(14, { message: "Required (Should be in international format)" })
    .max(14, { message: "Required (Should be in international format)" }),
  nin: z
    .string()
    .min(11, { message: "Required" })
    .max(11, { message: "Required" }),
  passportPhotograph: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      src: z.string().url(),
      key: z.string(),
      mimetype: z.string(),
      size: z.number(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      __v: z.number(),
    }),
    { message: "Required" },
  ),
  addressProof: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      src: z.string().url(),
      key: z.string(),
      mimetype: z.string(),
      size: z.number(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      __v: z.number(),
    }),
    { message: "Required" },
  ),
});
export default function CustomerForm({ type, customer }: TCustomerFormProps) {
  const customerId = customer._id;
  const { data: currentCustomer, isLoading } =
    useGetCustomerByIdQuery(customerId);
  const [addCustomer] = useAddCustomerMutation();
  const [editCustomer] = useEditCustomerMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "edit"
        ? {
            firstName: currentCustomer?.firstName || "",
            lastName: currentCustomer?.lastName || "",
            email: currentCustomer?.email || "",
            address: currentCustomer?.address || "",
            role: "admin",
            gender: "",
            phoneNumber: currentCustomer?.phoneNumber || "",
            nin: "",
            passportPhotograph: currentCustomer?.idCard,
            addressProof: currentCustomer?.addressProof,
          }
        : {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            role: "admin",
            gender: "",
            phoneNumber: "",
            nin: "",
            passportPhotograph: [
              {
                _id: "",
                name: "",
                src: "",
                key: "",
                mimetype: "",
                size: 0,
                createdAt: "",
                updatedAt: "",
                __v: 0,
              },
            ],
            addressProof: [
              {
                _id: "",
                name: "",
                src: "",
                key: "",
                mimetype: "",
                size: 0,
                createdAt: "",
                updatedAt: "",
                __v: 0,
              },
            ],
          },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    try {
      const response = await (type === "edit"
        ? editCustomer({ id: customerId, ...values }).unwrap()
        : addCustomer({ ...values }).unwrap());

      console.log(response);
      handleApiSuccessResponse(response);
    } catch (err) {
      handleApiErrors(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between">
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          {type === "edit" ? "Edit" : "Add New"} Customer{" "}
        </h2>
        <ScrollArea className="h-full w-full px-5 py-8">
          {type === "edit" ? (
            currentCustomer &&
            !isLoading && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
                      <FormControl>
                        <TextInput
                          placeholder="Enter First Name"
                          label="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          placeholder="Enter Email"
                          label="Email Address"
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
                          label="Residential Address"
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
                        <CustomSelect
                          placeholder="Gender"
                          options={[
                            { name: "Male", value: "Male" },
                            { name: "Female", value: "Female" },
                          ]}
                          {...field}
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
                    <FormItem>
                      <FormControl>
                        <FileInput label="Passport Photograph" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressProof"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileInput label="Proof of Residence" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )
          ) : (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormControl>
                      <TextInput
                        placeholder="Enter First Name"
                        label="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        placeholder="Enter Email"
                        label="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "add" && (
                <FormField
                  control={form.control}
                  name="nin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          placeholder="Enter NIN"
                          label="National Identification Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        placeholder="Enter Address"
                        label="Residential Address"
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
                      <CustomSelect
                        placeholder="Gender"
                        options={[
                          { name: "Male", value: "Male" },
                          { name: "Female", value: "Female" },
                        ]}
                        {...field}
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
                  <FormItem>
                    <FormControl>
                      <FileInput label="Passport Photograph" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressProof"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileInput label="Proof of Residence" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </ScrollArea>
        <div className="flex items-center justify-end space-x-5 px-5 py-2 lg:py-4">
          <Button type="submit" className="h-12 w-full">
            {type === "add" ? "Add Customer" : "Edit Cusomer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
