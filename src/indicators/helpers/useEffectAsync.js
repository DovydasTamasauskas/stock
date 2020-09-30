import { useEffect } from "react";
import { findDuplicates } from "../functions/func.js";
import { STOCKS } from "../consts/CONST.js";

export default function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
  }, [inputs]);
}

findDuplicates(STOCKS);
