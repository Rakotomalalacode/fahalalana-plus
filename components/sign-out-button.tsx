"use client"

import { signOut } from "next-auth/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p
          className="outfit w-full"
        >Se déconnecter</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="outfit rounded">
        <AlertDialogHeader>
          <AlertDialogTitle>Déconnexion ?</AlertDialogTitle>
          <AlertDialogDescription>
            Souhaitez-vous vraiment vous déconnecter ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
         <div className="w-full flex justify-between">
           <AlertDialogCancel className="w-[46%] rounded">Non</AlertDialogCancel>
          <AlertDialogAction
          onClick={() => signOut({callbackUrl: "/"})}
          className="group relative w-[46%] flex justify-center py-2 border border-transparent text-sm font-medium rounded text-white bg-orangeme/90 hover:bg-orangeme focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangeme disabled:opacity-50"
          >Oui</AlertDialogAction>
         </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}