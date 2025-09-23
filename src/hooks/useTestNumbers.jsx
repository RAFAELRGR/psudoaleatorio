import { pruebaUniformidad } from "../operations/chi_cuadrado";
import { pruebaIndependencia } from "../operations/independencia";
import { pruebaMedia } from "../operations/media";
import { pruebaVarianza } from "../operations/varianza";

const useTestNumbers = (numbersToTest, setContenidoTest) => {
  try {
    let result_test = [
      pruebaUniformidad(numbersToTest),
      pruebaIndependencia(numbersToTest),
      pruebaMedia(numbersToTest),
      pruebaVarianza(numbersToTest),
    ];
    setContenidoTest(result_test);
  } catch (error) {
    setContenidoTest([]);
  }
};

export default useTestNumbers;
