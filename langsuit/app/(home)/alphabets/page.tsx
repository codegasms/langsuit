import AlphabetsSearch from "./alpha-search";

export default function AlphabetsPage() {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold to-neutral-700">Alphabets Page</h1>
      <AlphabetsSearch />
    </div>
  );
}
