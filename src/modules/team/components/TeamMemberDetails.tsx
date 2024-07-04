import StatusTag from "@/src/components/common/StatusTag";
import ScrollArea from "@/src/components/core/scroll-area";
import TextInput from "@/src/components/core/text-input";
import UserIcon from "@/src/components/icons/UserIcon";

type TeamMemberDetailsProps = {
  member: Record<string, any>;
};

export default function TeamMemberDetails({
  member: { name, role, status, phone, email, address },
}: TeamMemberDetailsProps) {
  console.log(name, role, status, phone, email, address);
  return (
    <div>
      <div>
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          Team Member Profile
        </h2>
      </div>

      <ScrollArea className="h-full w-full px-5 py-8">
        <div className="space-y-8">
          <div className="flex items-start justify-between space-x-3">
            <div className="flex items-center space-x-3 lg:space-x-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F5F8]">
                <UserIcon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium capitalize text-wheels-primary lg:text-lg">
                  {name}
                </p>
                <div className="flex items-center space-x-2 rounded-2xl bg-wheels-grey px-2 py-1 text-white">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-xs">{role}</span>
                </div>
              </div>
            </div>
            <StatusTag status={status} />
          </div>

          <div className="space-y-5">
            <TextInput defaultValue={phone} label="Phone Number" />
            <TextInput defaultValue={email} label="Email Address" />
            <TextInput defaultValue={address} label="Residential Address" />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
