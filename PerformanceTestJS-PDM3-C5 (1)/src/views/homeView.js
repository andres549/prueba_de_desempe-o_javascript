import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();
  const isAdmin = user?.role === "admin";

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">
      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen space-y-6">
        
        <!-- Cabecera de Bienvenida -->
        <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 class="text-xl font-bold text-slate-800">
              Bienvenido, ${user?.name || "Usuario"}
            </h1>
            <p class="text-sm text-slate-500 capitalize">
              Rol actual: <span class="font-semibold text-orange-600">${user?.role}</span>
            </p>
          </div>
          <div>
            <!-- Botón de acción rápida condicional -->
            ${
              isAdmin 
                ? `<button id="btnCreateReservation" class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow">
                     + Crear Reserva
                   </button>`
                : `<button id="btnNewReservation" class="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow">
                     + Nueva Reserva
                   </button>`
            }
          </div>
        </div>

        <!-- SECCIÓN EXCLUSIVA DE ADMINISTRADOR -->
        ${
          isAdmin
            ? `
              <!-- Estadísticas Generales (Puntos Extra) -->
              <section class="grid grid-cols-1 md:grid-cols-4 gap-4" id="statsContainer">
                <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 animate-pulse">
                  <p class="text-xs font-bold text-slate-400 uppercase">Reservas Totales</p>
                  <p class="text-2xl font-bold text-slate-700">...</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500 animate-pulse">
                  <p class="text-xs font-bold text-slate-400 uppercase">Pendientes de Aprobación</p>
                  <p class="text-2xl font-bold text-slate-700">...</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500 animate-pulse">
                  <p class="text-xs font-bold text-slate-400 uppercase">Espacios Ocupados</p>
                  <p class="text-2xl font-bold text-slate-700">...</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 animate-pulse">
                  <p class="text-xs font-bold text-slate-400 uppercase">Usuarios Activos</p>
                  <p class="text-2xl font-bold text-slate-700">...</p>
                </div>
              </section>

              <!-- Módulo de Gestión de Espacios y Usuarios (Puntos Extra) -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Columna: Gestión de Espacios (CRUD) -->
                <section class="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
                  <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-lg text-slate-800">Gestión de Espacios de Trabajo</h2>
                    <button id="btnCreateSpace" class="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded font-medium transition-colors">
                      + Crear Espacio
                    </button>
                  </div>
                  <div id="spacesContainer" class="grid gap-3 sm:grid-cols-2">
                    <p class="text-slate-400 text-sm py-4 col-span-2 text-center">Cargando espacios...</p>
                  </div>
                </section>

                <!-- Columna: Visualizar Usuarios Registrados -->
                <section class="bg-white p-5 rounded-lg shadow-sm">
                  <h2 class="font-bold text-lg text-slate-800 mb-4">Usuarios Registrados</h2>
                  <div class="overflow-y-auto max-h-[280px] divide-y divide-slate-100" id="usersContainer">
                    <p class="text-slate-400 text-sm py-4 text-center">Cargando lista de usuarios...</p>
                  </div>
                </section>

              </div>
            `
            : ""
        }

        <!-- SECCIÓN GLOBAL: CONTENEDOR DE RESERVAS -->
        <section class="bg-white p-5 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-slate-100 mb-4 gap-2">
            <div>
              <h2 class="font-bold text-xl text-slate-800">
                ${isAdmin ? "Control Maestro de Reservas" : "Mis Reservas"}
              </h2>
              <p class="text-xs text-slate-500 mt-0.5">
                ${isAdmin ? "Ver, editar, eliminar y aprobar o rechazar solicitudes de usuarios." : "Monitorea y gestiona tus reservas agendadas."}
              </p>
            </div>
            
            <!-- Filtros de búsqueda rápidos -->
            <div class="flex gap-2">
              <select id="filterStatus" class="text-xs border border-slate-200 p-2 rounded-lg bg-slate-50 font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
          </div>

          <!-- Contenedor Principal de Reservas (Inyección vía Controller) -->
          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div class="w-full text-center py-12 col-span-full">
              <p class="text-slate-500 animate-pulse text-sm">
                Cargando historial de reservas...
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;
}
