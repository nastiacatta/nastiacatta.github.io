export default function Header() {
    return (
      <header className="bg-gray-900 text-white py-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">My Portfolio</div>
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-indigo-400">About</a></li>
            <li><a href="#projects" className="hover:text-indigo-400">Projects</a></li>
            <li><a href="#contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  