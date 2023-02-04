import { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div style={{ display: "grid", gap: "1rem .5rem", justifyContent: "flex-start", gridTemplateColumns: "auto minmax(auto, 400px)" }}>{children}</div>
    </>
  )
}