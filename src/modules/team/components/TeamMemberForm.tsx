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

type TeamMemberFormProps = {
  close: () => void;
};

const formSchema = z
  .object({
    firstName: z.string().min(5, { message: "Required" }),
    lastName: z.string().min(5, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    address: z.string().min(10, { message: "Required" }),
    phone: z
      .string()
      .min(11, { message: "Required" })
      .max(11, { message: "Required" }),
    nin: z
      .string()
      .min(11, { message: "Required" })
      .max(11, { message: "Required" }),
  })
  .superRefine((data, ctx) => {
    if (!/^\d{11}$/.test(data.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
        path: ["phone"],
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

export default function TeamMemberForm({ close }: TeamMemberFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      nin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // TODO - Call API
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between">
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          Add New Team Member
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
