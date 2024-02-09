import { useState } from "react";
import { effectiveDevelopers } from "./calc";
import { ArcherElement, ArcherContainer } from "react-archer";

const showMarker = (position: number, length: number) => {
  if (length <= 10) {
    return true;
  } else if (length <= 30) {
    return position % 2 === 0;
  } else if (length <= 50) {
    return position % 3 === 0;
  } else if (length <= 70) {
    return position % 5 === 0;
  } else {
    return position % 10 === 0;
  }
};

export default function App() {
  const [calc, setCalc] = useState(() => {
    const log: number[] = [];
    const effective = effectiveDevelopers(2, log);

    return {
      devs: 2,
      effective: effective,
      log: log,
    };
  });
  const [inputDevs, setInputDevs] = useState("2");

  const updateDevs = (count: number) => {
    const log: number[] = [];
    const effective = effectiveDevelopers(count, log);
    setCalc({
      devs: count,
      effective,
      log,
    });
    setInputDevs(count.toString());
  };

  const percentage = Math.floor((calc.effective / calc.devs) * 10000) / 100;

  return (
    <div className="max-w-md mx-auto pt-12 px-4 flex flex-col justify-between h-screen">
      <div className="">
        <h1 className="md:text-4xl font-bold tracking-wide pb-6 text-center text-3xl">
          Dev Efficiency Calc
        </h1>
        <div className="bg-neutral-900 rounded-lg border border-neutral-700 mx-auto p-4 w-full">
          <section>
            <h2 className="text-xl md:text-2xl font-bold px-4 pb-4">Devs</h2>
            <div className="flex h-16">
              <button
                className="bg-neutral-800 border border-neutral-700 rounded-l px-2 py-1 flex-1 hover:bg-neutral-700"
                disabled={calc.devs <= 1}
                onClick={() => updateDevs(calc.devs - 1)}
              >
                -
              </button>
              <input
                className="text-xl border-y border-neutral-700 px-2 py-1 flex-1 flex items-center justify-center bg-transparent text-center"
                value={inputDevs}
                max="100"
                min="1"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 100) {
                    updateDevs(value);
                  } else if (isNaN(value)) {
                    setInputDevs("");
                  } else {
                    setInputDevs(e.target.value);
                  }
                }}
              />
              <button
                className="bg-neutral-800 border border-neutral-700 rounded-r px-2 py-1 flex-1 hover:bg-neutral-700"
                disabled={calc.devs >= 100}
                onClick={() => updateDevs(calc.devs + 1)}
              >
                +
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-xl md:text-2xl font-bold px-4 py-4">Output</h2>
            <div className="text-xl border border-neutral-700 px-2 py-1 flex items-center justify-center font-mono rounded">
              {calc.devs} =&gt; {Math.floor(calc.effective * 100) / 100} (
              {percentage}%)
            </div>
          </section>
          <section>
            <h2 className="text-xl md:text-2xl font-bold px-4 py-4">Graph</h2>
            <ArcherContainer strokeColor="rgb(239, 68, 68)" endMarker={false}>
              <div className="aspect-square bg-neutral-950 rounded px-12 py-14 border border-neutral-700">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 h-full border-l border-white"></div>
                  <div className="absolute bottom-0 left-0 w-full border-b border-white"></div>
                  <div className="absolute top-full left-1/2 pt-6 -translate-x-1/2 text-neutral-500">
                    Developers
                  </div>
                  <div className="absolute bottom-full pb-4 left-1/2 -translate-x-1/2 text-lg whitespace-nowrap">
                    Devs vs Effective Devs
                  </div>
                  <div
                    className="absolute right-full top-1/2 whitespace-nowrap text-neutral-500"
                    style={{
                      transform: `translateX(50%) translateY(-50%) rotate(90deg) translateY(120%)`,
                    }}
                  >
                    Effective Developers
                  </div>
                  {calc.log.map((value, index, arr) => (
                    <>
                      {showMarker(index, arr.length) ? (
                        <>
                          <div
                            key={index}
                            className="absolute right-full flex flex-row items-center translate-y-1/2"
                            style={{
                              bottom: `${((index + 0.5) / arr.length) * 100}%`,
                            }}
                          >
                            <span className="pr-0.5">{index + 1}</span>
                            <div className="w-1 h-0.5 bg-white"></div>
                          </div>
                          <div
                            key={index}
                            className="absolute top-full flex flex-col items-center -translate-x-1/2"
                            style={{
                              left: `${((index + 0.5) / arr.length) * 100}%`,
                            }}
                          >
                            <div className="w-0.5 h-1 bg-white"></div>
                            <span>{index + 1}</span>
                          </div>
                        </>
                      ) : null}
                      <ArcherElement
                        id={`ideal-${index}`}
                        relations={[
                          {
                            targetId: `ideal-${index + 1}`,
                            targetAnchor: "middle",
                            sourceAnchor: "middle",
                            style: { strokeColor: "rgb(250, 250, 250)" },
                          },
                        ]}
                      >
                        <div
                          key={index}
                          className="absolute w-1 h-1 bottom-0 left-0 bg-transparent rounded-full"
                          style={{
                            bottom: `calc(${
                              ((index + 0.5) / arr.length) * 100
                            }%)`,
                            left: `calc(${
                              ((index + 0.5) / arr.length) * 100
                            }%)`,
                          }}
                        >
                          {arr.length < 2 ? (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              👌
                            </div>
                          ) : index === arr.length - 1 ? (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-neutral-700/80 px-1 leading-tight rounded">
                              {index + 1}
                            </div>
                          ) : null}
                        </div>
                      </ArcherElement>
                      <ArcherElement
                        id={`dev-${index}`}
                        relations={[
                          {
                            targetId: `dev-${index + 1}`,
                            targetAnchor: "middle",
                            sourceAnchor: "middle",
                          },
                        ]}
                      >
                        <div
                          key={index}
                          className="absolute w-1 h-1 bottom-0 left-0 bg-transparent rounded-full"
                          style={{
                            bottom: `calc(${
                              ((value - 0.5) / arr.length) * 100
                            }%)`,
                            left: `calc(${
                              ((index + 0.5) / arr.length) * 100
                            }%)`,
                          }}
                        >
                          {arr.length > 1 && index === arr.length - 1 ? (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 text-red-500 bg-red-950/80 px-1 leading-tight rounded">
                              {Math.floor(value * 100) / 100}
                            </div>
                          ) : null}
                        </div>
                      </ArcherElement>
                    </>
                  ))}
                </div>
              </div>
            </ArcherContainer>
          </section>
        </div>
        <p className="text-sm text-neutral-500 px-4 py-6 text-justify">
          This is a simple approximation of how many "effective" developers you
          get on a team given x number of developers. It's a recursive function
          that simulates the diminishing returns of adding more developers to a
          project. The more developers you add, the less effective each
          additional developer becomes.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="text-neutral-500 text-sm py-4">
          Copyright &copy; Cameron Burrows {new Date().getFullYear()}
        </div>
        <a
          href="https://github.com/Asdougl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 text-sm py-4"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
