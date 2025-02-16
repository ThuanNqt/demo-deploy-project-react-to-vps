import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { QUERY_KEY } from "../../constant/key";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    console.log({ id: dataBlog?.id });
    mutation.mutate(dataBlog?.id);
  };

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": " application/json",
        },
      });

      return await res.json();
    },
    onSuccess: (data, variables, context) => {
      console.log(">>> data: ", data);
      console.log(">>> variables: ", variables);
      console.log(">>> context: ", context);

      setIsOpenDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllBlogs() });
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
        <Modal.Title>Delete A Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the blog: {dataBlog?.title ?? ""}</Modal.Body>
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

export default BlogDeleteModal;
