type LoadingModalProps = {
  title?: string;
  description?: string;
};

export default function LoadingModal({
  title,
  description,
}: LoadingModalProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full items-center justify-center">
      <div className="mx-auto max-w-sm rounded-lg bg-white px-5 py-8 shadow-lg lg:py-10">
        <div className="text-center">
          <div className="mx-auto w-full pb-10 pt-6">
            <div className="loading-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-loyaone-black-primary mb-3 mt-5 text-2xl font-medium leading-6">
              {title ?? "Processing ..."}
            </h3>

            <div>
              <p className="font-matter text-loyaone-black-primary text-sm">
                {description ??
                  "Please wait a while for this information to be processed"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
