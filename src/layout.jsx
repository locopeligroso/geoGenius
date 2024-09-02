import square from "/svgs/square.svg"
import triangle from "/svgs/triangle.svg"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar() {
  return (
    <>
      <div className="btm-nav z-10">
        <Button className="text-primary" src={square} />
        <Button className="text-primary active" src={triangle} />
        <Button className="text-primary" src={square} />
      </div>
    </>
  )
}

function Button({ className, src }) {
  return (
    <button className={className}>
      <img src={src} className="h-5 w-5" />
    </button>
  )
}
