import { useCallback, useState } from "react";

function useInput(text) {
  const [value, setValue] = useState(text);
  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue];
}

export default useInput;
