export default function Home() {
  return (
    <div className="w-full min-h-[90vh]">
      <div className="w-full h-[70vh] flex gap-5 justify-between">
        <div className="w-1/2 h-full flex flex-col justify-center items-start gap-5">
          <p className="text-6xl font-[600]">
            Your Daily Dish
            <br />A{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Food
            </span>{" "}
            Journey
          </p>
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
}
