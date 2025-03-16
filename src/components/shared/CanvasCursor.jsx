import useCanvasCursor from "../../hooks/useCanvasCursor";

const CanvasCursor = () => {
	useCanvasCursor();

	return (
		<canvas
			style={{
				pointerEvents: "none",
				position: "fixed",
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			}}
			id="canvas"
		/>
	);
};
export default CanvasCursor;
