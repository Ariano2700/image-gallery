import Swal from "sweetalert2";

export default function ConfirmAlert(callback: () => void) {
  Swal.fire({
    title: "¿Estás seguro de borrar?",
    text: "¡Se borrará permanentemente!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, borrar!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}
