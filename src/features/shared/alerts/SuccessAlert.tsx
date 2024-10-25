import Swal from "sweetalert2";

export default function SuccessAlert({ title }: { title: string }) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}
