import Header from "../../ui/Header";

export default function HomeLayout({ children }) {
  return (
    <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      {children}
    </div>
  );
}
