import { useState, useEffect } from "react";

const useInit = () => {
	const [intitialzing, setIntitialzing] = useState(true);
	return {
		intitialzing,
	};
};

export default useInit;
