import React, { useState, useCallback, useEffect,useRef } from "react";

const PassGenerator = () => {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (!numberAllowed) str += "0123456789";
    if (!charAllow) str += "!@#$%^&*_+{}[]~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllow, setPassword]);

  useEffect(() => {
    passwordGen();
  }, [length, numberAllowed, charAllow, passwordGen]);
 

  // refhook
  const passRef = useRef(null);

 const copyPaswword = useCallback(()=>{
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password);
 },[password])
 

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className=" text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className=" outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button className=" outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={copyPaswword}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className=" flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={14}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLenght(e.target.value);
            }}
          />
          <label>Length : {length}</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className=" flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllow((prev) => !prev);
            }}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  );
};

export default PassGenerator;
