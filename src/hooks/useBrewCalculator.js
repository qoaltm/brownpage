import { useMemo, useState } from "react";
import { recipes, buildSchedule, strengthEstimate, icedVersion } from "../data/recipes";

export default function useBrewCalculator() {
  const [recipeKey, setRecipeKey] = useState("kasuya");
  const [dose, setDose] = useState(recipes.kasuya.dose);
  const [ratio, setRatio] = useState(recipes.kasuya.ratio);
  const [temp, setTemp] = useState(recipes.kasuya.temp);
  const [grind, setGrind] = useState(recipes.kasuya.grind);
  const [agitation, setAgitation] = useState(recipes.kasuya.agitation);
  const [sweetAcid, setSweetAcid] = useState(50);
  const [strengthPours, setStrengthPours] = useState(3);

  function selectRecipe(key) {
    const r = recipes[key];
    setRecipeKey(key);
    setDose(r.dose);
    setRatio(r.ratio);
    setTemp(r.temp);
    setGrind(r.grind);
    setAgitation(r.agitation);
  }

  const schedule = useMemo(
    () => buildSchedule({ recipe: recipeKey, dose, ratio, temp, agitation, sweetAcid, strengthPours }),
    [recipeKey, dose, ratio, temp, agitation, sweetAcid, strengthPours]
  );
  const strength = useMemo(
    () => strengthEstimate({ recipe: recipeKey, temp, ratio, agitation }, schedule),
    [recipeKey, temp, ratio, agitation, schedule]
  );
  const iced = useMemo(() => icedVersion(schedule.totalWater), [schedule.totalWater]);

  return {
    recipeKey, dose, ratio, temp, grind, agitation, sweetAcid, strengthPours,
    setDose, setRatio, setTemp, setGrind, setAgitation, setSweetAcid, setStrengthPours,
    selectRecipe,
    schedule, strength, iced,
    showMini: recipes[recipeKey].showMini,
  };
}
