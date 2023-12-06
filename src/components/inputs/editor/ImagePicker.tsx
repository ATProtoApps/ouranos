import Button from "@/components/actions/button/Button";

export default function ImagePicker() {
  return (
    <div>
      <Button
        icon="bx:image"
        iconColor="text-primary hover:text-primary-dark"
        iconSize="text-2xl"
        className="p-0"
      />
    </div>
  );
}