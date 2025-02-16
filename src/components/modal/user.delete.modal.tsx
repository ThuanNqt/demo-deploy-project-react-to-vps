import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { QUERY_KEY } from "../../constant/key";

const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    console.log({ id: dataUser?.id });
    mutation.mutate(dataUser?.id);
  };

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": " application/json",
        },
      });

      return await res.json();
    },
    onSuccess: () => {
      setIsOpenDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllUsers() });
    },
  });

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        {mutation.isPending ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <></>Saving...
          </Button>
        ) : (
          <>
            <Button
              variant="warning"
              onClick={() => setIsOpenDeleteModal(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()}>Confirm</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
