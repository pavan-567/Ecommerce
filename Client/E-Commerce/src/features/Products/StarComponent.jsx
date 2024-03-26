function StarComponent() {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>${i + 1}</span>
      ))}
    </div>
  );
}

export default StarComponent;
