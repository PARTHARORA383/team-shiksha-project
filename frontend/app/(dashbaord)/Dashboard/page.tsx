import { Profile } from "@/components/profile";


export default function Dashboard (){
  return(
    <div>
      <h1 className="text-xl text-muted-foreground lg:ml-8 mt-8">Dashboard</h1>
      <Profile/>
    </div>
  )
}