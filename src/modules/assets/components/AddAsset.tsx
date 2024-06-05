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
import CustomSelect from "@/src/components/core/custom-select";
import TextInput from "@/src/components/core/text-input";
import ScrollArea from "@/src/components/core/scroll-area";

type AddAssetProps = {
  close: () => void;
};

const formSchema = z
  .object({
    category: z.string().min(1, { message: "Select a category" }),
    serialNumber: z.string(),
    type: z.string(),
    otherAssetType: z.string().optional(),
    brandName: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
    year: z.string().optional(),
    engineCapacity: z.string().optional(),
    fuelType: z.string().optional(),
  })
  .superRefine(
    (
      {
        category,
        serialNumber,
        type,
        otherAssetType,
        brandName,
        model,
        color,
        year,
        engineCapacity,
        fuelType,
      },
      ctx,
    ) => {
      if (category === "reeddi_system") {
        if (serialNumber === "") {
          ctx.addIssue({
            path: ["serialNumber"],
            message: "Serial number is required",
            code: "custom",
          });
        } else if (serialNumber.length < 8) {
          ctx.addIssue({
            path: ["serialNumber"],
            message: "Serial number is too short",
            code: "custom",
          });
        } else if (serialNumber.length > 10) {
          ctx.addIssue({
            path: ["serialNumber"],
            message: "Serial number is too long",
            code: "custom",
          });
        }

        if (type === "") {
          ctx.addIssue({
            path: ["type"],
            message: "Select a type",
            code: "custom",
          });
        }
      }

      if (category === "others") {
        [
          {
            field: otherAssetType,
            path: ["otherAssetType"],
            message: "Select a type",
          },
          {
            field: brandName,
            path: ["brandName"],
          },
          {
            field: model,
            path: ["model"],
          },
          {
            field: color,
            path: ["color"],
          },
          {
            field: year,
            path: ["year"],
          },
          {
            field: engineCapacity,
            path: ["engineCapacity"],
          },
          {
            field: fuelType,
            path: ["fuelType"],
          },
        ].forEach(({ field, path, message }) => {
          if (field === "") {
            ctx.addIssue({
              path,
              message: message ?? "This field is required",
              code: "custom",
            });
          }
        });
      }
    },
  );

const categoryOptions = [
  {
    name: "Reeddi System",
    value: "reeddi_system",
    icon: "/assets/images/reeddi-capsule.png",
  },
  {
    name: "Others (e.g Bikes, Van, etc)",
    value: "others",
    icon: "/assets/images/van.png",
  },
];

const otherAssetFields = [
  {
    key: "brandName",
    label: "Brand Name",
    placeholder: "Enter Brand Name",
  },
  { key: "model", label: "Model", placeholder: "Enter Model" },
  { key: "color", label: "Color", placeholder: "Enter Color" },
  { key: "year", label: "Year", placeholder: "Enter Year" },
  {
    key: "engineCapacity",
    label: "Engine Capacity",
    placeholder: "Enter Engine Capacity",
  },
  {
    key: "fuelType",
    label: "Fuel Type",
    placeholder: "Enter Fuel Type",
  },
];

export default function AddAsset({ close }: AddAssetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      serialNumber: "",
      type: "",
      otherAssetType: "",
      brandName: "",
      model: "",
      color: "",
      year: "",
      engineCapacity: "",
      fuelType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleApiSuccessResponse({ message: "Asset added successfully" }, close);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between">
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          Add New Asset
        </h2>

        <ScrollArea className="h-full w-full px-5 py-8">
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-[rgba(85,112,126,1)]">
                Select Category
              </p>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        tiggerClassName="!w-full"
                        contentClassName="w-full"
                        options={categoryOptions}
                        placeholder="Select Category"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("category") === "reeddi_system" && (
              <>
                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          placeholder="Enter Serial Number"
                          label="Serial Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <p className="text-sm text-[rgba(85,112,126,1)]">
                    System Type
                  </p>

                  <div className="my-2 flex items-center space-x-4">
                    {["Capsule", "Energy Box", "Big Energy"].map(
                      (type, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <button
                                  type="button"
                                  onClick={() =>
                                    field.onChange(
                                      type.toLowerCase().split(" ").join("-"),
                                    )
                                  }
                                  className={`
                            ${field.value === type.toLowerCase().split(" ").join("-") ? "border-wheels-primary bg-wheels-primary text-white" : "border-[rgba(65,64,66,0.5)] bg-[rgba(85,112,126,0.1)] text-[rgba(143,143,143,1)]"} flex h-12 w-full items-center justify-center rounded-lg border text-sm font-medium`}>
                                  {type}
                                </button>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ),
                    )}
                  </div>

                  {form.formState.errors.type && (
                    <p className="text-xs text-wheels-error lg:text-13">
                      {form.formState.errors.type.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {form.watch("category") === "others" && (
              <>
                {otherAssetFields.map(({ key, label, placeholder }, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={key as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            placeholder={placeholder}
                            label={label}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div>
                  <p className="text-sm text-[rgba(85,112,126,1)]">
                    Select Type
                  </p>

                  <div className="my-2 flex items-center space-x-4">
                    {["Bike", "Van", "Others"].map((type, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name="otherAssetType"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <button
                                type="button"
                                onClick={() =>
                                  field.onChange(type.toLowerCase())
                                }
                                className={`
                            ${field.value === type.toLowerCase() ? "border-wheels-primary bg-wheels-primary text-white" : "border-[rgba(65,64,66,0.5)] bg-[rgba(85,112,126,0.1)] text-[rgba(143,143,143,1)]"} flex h-12 w-full items-center justify-center rounded-lg border text-sm font-medium`}>
                                {type}
                              </button>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {form.formState.errors.otherAssetType && (
                    <p className="text-xs text-wheels-error lg:text-13">
                      {form.formState.errors.otherAssetType.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end space-x-5 px-5 py-2 lg:py-4">
          <button
            onClick={close}
            type="button"
            className="w-1/2 rounded-md bg-[rgba(225,225,225,1)] px-8 py-4 text-sm font-medium text-[rgba(143,143,143,1)]">
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 rounded-md bg-wheels-primary px-8 py-4 text-sm font-medium text-white lg:text-15">
            Add to Assets
          </button>
        </div>
      </form>
    </Form>
  );
}
