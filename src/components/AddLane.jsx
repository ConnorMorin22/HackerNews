function AddLane({ term }) {
  return (
    <AddPage
      key={term.id}
      value={term.name}
      onDelete={() => {
        setSubReddits(subReddits.filter((query) => query.id !== term.id));
      }}
    />
  );
}
export default AddLane;
