function SpotifyCardSkeletor() {
  return (
    <div
      className="bg-[#282828] h-[330px] p-5 w-full flex flex-col items-center 
    rounded-2xl text-white gap-4 min-[500px]:flex-row min-[500px]:h-[250px]"
    >
      {/* Imagen de perfil (esqueleto redondeado) */}
      <div className="bg-gray-400 animate-pulse object-cover min-w-32 h-32 w-32 rounded-full"></div>

      <div className="flex flex-col justify-center gap-5 w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center gap-1">
            {/* Nombre de perfil (barra) */}
            <div className="h-8 w-48 bg-gray-400 animate-pulse rounded"></div>
            {/* Seguidores (barra más pequeña) */}
            <div className="h-4 w-24 bg-gray-400 animate-pulse rounded"></div>
          </div>
          {/* SpotifyButton (simulación de botón) */}
          <div className="bg-gray-400 animate-pulse h-10 w-10 rounded-lg"></div>
        </div>

        {/* Controles (tres círculos y barra de control) */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full">
            <div className="bg-gray-400 animate-pulse h-4 w-4 rounded-full"></div>
            <div className="bg-gray-400 animate-pulse h-4 w-4 rounded-full"></div>
            <div className="bg-gray-400 animate-pulse h-4 w-4 rounded-full"></div>
          </div>
          <div className="bg-gray-400 animate-pulse h-4 w-full rounded"></div>
        </div>
      </div>
    </div>
  );
}
export default SpotifyCardSkeletor;
