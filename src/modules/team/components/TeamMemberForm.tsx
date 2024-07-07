import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  handleApiErrors,
  handleApiSuccessResponse,
} from "@/src/store/api/helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/core/form";
import ScrollArea from "@/src/components/core/scroll-area";
import TextInput from "@/src/components/core/text-input";
import { Button } from "@/src/components/core/button";
import { useAddTeamMemberMutation } from "@/src/store/api/team";
import Select from "@/src/components/core/select";

type TeamMemberFormProps = {
  type: "add" | "edit";
  member: Record<string, any>;
  close: () => void;
};

const formSchema = z
  .object({
    firstName: z.string().min(5, { message: "Required" }),
    lastName: z.string().min(5, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    address: z.string().min(10, { message: "Required" }),
    phoneNumber: z
      .string()
      .min(11, { message: "Required" })
      .max(14, { message: "Required" }),
    role: z.enum([
      "admin",
      "super_admin",
      "charge_agent",
      "ambassador",
      "field_staff",
      "customer",
    ]),
    gender: z.enum(["male", "female"]),
    nin: z
      .string()
      .min(11, { message: "Required" })
      .max(11, { message: "Required" }),
  })
  .superRefine((data, ctx) => {
    if (!/^\+\d{1,3}\d{10}$/.test(data.phoneNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Phone number must contain an international code starting with "+"',
        path: ["phoneNumber"],
      });
    }

    if (!/^\d{11}$/.test(data.nin)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid NIN",
        path: ["nin"],
      });
    }
  });

export default function TeamMemberForm({
  close,
  type,
  member,
}: TeamMemberFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      firstName: member.firstName || "",
      lastName: member.lastName || "",
      email: member.email || "",
      address: member.address || "",
      phoneNumber: member.phoneNumber || "",
      nin: member.nin || "",
      role: member.role || "",
      gender: member.gender || "",
    },
  });
  const [addTeamMember, isLoading] = useAddTeamMemberMutation();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await addTeamMember(values).unwrap();
      handleApiSuccessResponse(response);
    } catch (err) {
      handleApiErrors(err);
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between">
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          {type === "add" ? "Add New" : "Edit"}
          Team Member
        </h2>

        <ScrollArea className="h-full w-full px-5 py-8">
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
                      placeholder="Enter Last Name"
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Select Role"
                      label="Role"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "Super Admin", value: "super_admin" },
                        { label: "Charge Agent", value: "charge_agent" },
                        { label: "Ambassador", value: "ambassador" },
                        { label: "Field Staff", value: "field_staff" },
                        { label: "Customer", value: "customer" },
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Select Gender"
                      label="Gender"
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
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
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end space-x-5 px-5 py-2 lg:py-4">
          <Button onClick={close} className="h-12 w-full" variant="secondary">
            Close
          </Button>
          <Button className="h-12 w-full">Add to Team</Button>
        </div>
      </form>
    </Form>
  );
}
