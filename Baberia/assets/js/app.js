// ===============================
// DATOS DE LA RESERVA
// ===============================
let booking = {
    services: [],
    total: 0,
    barber: "",
    date: "",
    time: "",
    name: "",
    phone: ""
};

let guestMode = false;
let currentStep = 0;

// ===============================
// MODAL
// ===============================
function openModal() {
    document.getElementById("modal").style.display = "flex";
    showStep(0);
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ===============================
// INICIO
// ===============================
function login() {
    guestMode = false;
    showStep(1);
}

function guest() {
    guestMode = true;
    showStep(1);
}

// ===============================
// CAMBIO DE PASOS
// ===============================
function showStep(step) {

    document.querySelectorAll(".step").forEach(element => {
        element.classList.remove("active");
    });

    document.getElementById("step" + step).classList.add("active");

    currentStep = step;
}

// ===============================
// SIGUIENTE PASO
// ===============================
function nextStep() {

    // Paso 3 -> guardar fecha y hora
    if (currentStep === 3) {
        booking.date = document.getElementById("date").value;
        booking.time = document.getElementById("time").value;
    }

    showStep(currentStep + 1);
}

// ===============================
// SERVICIOS
// ===============================
function toggleService(card, name, price) {

    const index = booking.services.findIndex(
        service => service.name === name
    );

    if (index >= 0) {

        booking.services.splice(index, 1);
        card.classList.remove("selected");

    } else {

        booking.services.push({
            name: name,
            price: price
        });

        card.classList.add("selected");
    }

    updateServiceSummary();
}

// ===============================
// ACTUALIZAR RESUMEN
// ===============================
function updateServiceSummary() {

    const list = document.getElementById("serviceList");
    const total = document.getElementById("totalPrice");

    list.innerHTML = "";

    let suma = 0;

    booking.services.forEach(service => {

        suma += service.price;

        const li = document.createElement("li");
        li.textContent = `${service.name} - S/${service.price}`;

        list.appendChild(li);

    });

    booking.total = suma;
    total.textContent = suma;
}

// ===============================
// BARBERO
// ===============================
function selectBarber(name) {
    booking.barber = name;
}

// ===============================
// FINALIZAR RESERVA
// ===============================
function finish() {

    booking.name = document.getElementById("name").value;
    booking.phone = document.getElementById("phone").value;

    let textoServicios = "";

    if (booking.services.length === 0) {
        textoServicios = "Ningún servicio seleccionado";
    } else {

        booking.services.forEach(service => {
            textoServicios +=
                `${service.name} - S/${service.price}\n`;
        });

    }

    const resumen =
`=========== RESERVA ===========

Servicios:
${textoServicios}

Barbero:
${booking.barber}

Fecha:
${booking.date}

Hora:
${booking.time}

Cliente:
${booking.name}

Teléfono:
${booking.phone}

TOTAL:
S/${booking.total}
`;

    document.getElementById("summary").textContent = resumen;

    showStep(5);
}