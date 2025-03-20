import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap flex-col md:flex-row items-center -mb-3">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <div className="w-20">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <span class="font-serif text-xl">Travelwise</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            onClick={() => {
              window.location.href = "/";
            }}
            class="mr-5 hover:text-gray-900"
          >
            Home
          </a>
          <a
            onClick={() => {
              window.location.href = "/bus";
            }}
            class="mr-5 hover:text-gray-900"
          >
            Private Bus
          </a>
          <a
            onClick={() => {
              window.location.href = "/railway";
            }}
            class="mr-5 hover:text-gray-900"
          >
            Train
          </a>
          <a
            onClick={() => {
              window.location.href = "/ksrtc";
            }}
            class="mr-5 hover:text-gray-900"
          >
            KSRTC Bus
          </a>
        </nav>
        <button
          onClick={() => {
            window.location.href = "/sign";
          }}
          class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Sign
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
export default Header;
