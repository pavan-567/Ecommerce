import Col from "react-bootstrap/esm/Col";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { countries } from "countries-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  editAddress,
  fetchAddressWithId,
} from "../../services/apiAddress";
import { getAddress, selectAddress } from "../Address/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import { useEffect } from "react";

function UserAddressForm({ editId, clear, handleEdit }) {
  const address = useSelector(getAddress(editId));
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: address,
    values: address,
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: create } = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      dispatch(selectAddress(data.id));
      toast.success("Address Created Successfully!");
      queryClient.invalidateQueries(["address"]);
      clear();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: editAddress,
    onSuccess: (data) => {
      toast.success("Address Updated Successfully!");
      queryClient.invalidateQueries(["address"]);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  function onSubmit(submittedAddress) {
    if (editId) update(submittedAddress);
    else create(submittedAddress);
    handleEdit(null);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column gap-3">
        <div>
          <FloatingLabel controlId="floatingMobile" label="Full Name">
            <Form.Control
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "This Field Is Required",
              })}
            />
          </FloatingLabel>
          <span>{errors?.fullName?.message}</span>
        </div>
        <div>
          <FloatingLabel controlId="floatingMobile" label="Mobile No.">
            <Form.Control
              type="number"
              placeholder="Mobile"
              {...register("mobile", {
                required: "This Field Is Required",
                minLength: {
                  value: 10,
                  message: "Phone Number Should Be 10 Digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone Number Should Be 10 Digits",
                },
              })}
            />
          </FloatingLabel>
          <span>{errors?.mobile?.message}</span>
        </div>

        <div>
          <FloatingLabel controlId="floatingPinCode" label="Pin Code">
            <Form.Control
              type="number"
              placeholder="Pin Code"
              {...register("zipCode", {
                required: "This Field Is Required",
                maxLength: {
                  value: 6,
                  message: "Pin Code Should Be Of 6 Digits",
                },
                minLength: {
                  value: 6,
                  message: "Pin Code Should Be Of 6 Digits",
                },
              })}
            />
            <span>{errors?.zipCode?.message}</span>
          </FloatingLabel>
        </div>

        <div>
          <FloatingLabel controlId="floatingTextarea2" label="Address">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              {...register("address", {
                required: "This Field Is Required",
              })}
            />
          </FloatingLabel>
          <span>{errors?.address?.message}</span>
        </div>

        <div>
          <FloatingLabel controlId="floatingMark" label="LandMark">
            <Form.Control
              type="text"
              placeholder="land mark"
              {...register("landmark", {
                required: "This Field Is Required",
              })}
            />
            <span>{errors?.landmark?.message}</span>
          </FloatingLabel>
        </div>

        <div>
          <FloatingLabel controlId="floatingCity" label="City">
            <Form.Control
              type="text"
              placeholder="City"
              {...register("city", {
                required: "This Field Is Required",
              })}
            />
          </FloatingLabel>
          <span>{errors?.city?.message}</span>
        </div>

        <div>
          <FloatingLabel controlId="floatingCity" label="State">
            <Form.Control
              type="text"
              placeholder="City"
              {...register("state", {
                required: "This Field Is Required",
              })}
            />
          </FloatingLabel>
          <span>{errors?.state?.message}</span>
        </div>

        <div>
          <FloatingLabel controlId="floatingSelectGrid" label="Country">
            <Form.Select
              aria-label="Floating label select example"
              {...register("country", {
                required: "This Field Is Required",
              })}
            >
              {Object.keys(countries).map((country, index) => {
                return (
                  <option value={countries[country].name} key={index}>
                    {countries[country].name}
                  </option>
                );
              })}
            </Form.Select>
            <span>{errors?.country?.message}</span>
          </FloatingLabel>
        </div>

        <div>
          <Button type="submit">Add New Address</Button>
        </div>
      </div>
    </form>
  );
}

export default UserAddressForm;
