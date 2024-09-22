export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-greyblack text-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anastasia Cattaneo</h1>
        <ul className="flex space-x-8">
          <li><a href="#home" className="hover:text-pink">Home</a></li>
          <li><a href="#about" className="hover:text-pink">About</a></li>
          <li><a href="#projects" className="hover:text-pink">Projects</a></li>
          <li><a href="#contact" className="hover:text-pink">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
