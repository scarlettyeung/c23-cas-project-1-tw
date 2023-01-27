import { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>{title}</div>
      <div style={{ display: "grid", gap: "1rem .5rem", justifyContent: "flex-start", gridTemplateColumns: "auto minmax(auto, 400px)" }}>{children}</div>
    </>
  )
}