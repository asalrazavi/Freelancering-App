import HomeContainer from "../features/home/HomeContainer";
import HomeLayout from "../features/home/HomeLayout";

export default function Home() {
  return (
    <div>
      <HomeLayout>
        <HomeContainer />
      </HomeLayout>
    </div>
  );
}
