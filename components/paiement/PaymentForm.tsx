"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useSidebar } from "../context/SidebarContext";
import { toast } from "sonner";

export default function PaymentForm({ cours, stylecl }: { cours: { id: string, titre: string, prix: number }, stylecl: string }) {
    const [phone, setPhone] = useState("");
    const [method, setMethod] = useState("mvola");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { setCurrentMenu } = useSidebar()
    const { setSelectedCours } = useSidebar()
    const handlePayment = async () => {
        setIsLoading(true);
        setSuccess(false);
        //alert("Paiement en cours...");
        setSelectedCours(cours.id)
        try {
            const res = await fetch("/api/payerment", {
                method: "POST",
                body: JSON.stringify({ coursId: cours.id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();
            if (res.ok) {
                 toast(<div className="text-green-700 font-outfit text-sm flex gap-2 items-center"><IconCircleDashedCheck /> Paiement effectué avec succès !</div>)
                setSuccess(true);
                setCurrentMenu("cours")
            } else {
                alert(data.message || "Erreur lors du paiement");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur inattendue");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className={`${stylecl}`}>Commencer le cours</DialogTrigger>
            <DialogContent className="rounded bg-accent font-outfit">
                <DialogHeader>
                    <DialogTitle className="text-center">Payer le cours</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="w-full p-6 rounded space-y-4">
                    <div className="flex justify-between">
                        <p className="text-lg font-medium">{cours.titre}</p>
                        <p className=" ">Prix : <span className="font-bold">{cours.prix.toLocaleString()} Ar</span></p>
                    </div>
                    {/* <div className="space-y-2">
                        <label className="block text-sm font-medium">Numéro de téléphone</label>
                        <Input
                            type="tel"
                            placeholder="034XXXXXXXX"
                            className="w-full p-2 border rounded"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Méthode de paiement</label>

                        <Select onValueChange={(value) => setMethod(value)}>
                            <SelectTrigger className="w-full rounded">
                                <SelectValue placeholder="choisir le moyen de paiement" />
                            </SelectTrigger>
                            <SelectContent className="rounded">
                                <SelectItem className="rounded" value="mvola">MVola</SelectItem>
                                <SelectItem className="rounded" value="orange">Orange Money</SelectItem>
                                <SelectItem className="rounded" value="airtel">Airtel Money</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
<div className="w-full flex justify-between">
          <p>Remise totale (20%)</p>
          <p>{((25 * (cours.prix))/100).toLocaleString()} Ar</p>
        </div>
        <div  className="w-full flex justify-between bg-white/50 p-3">
          <p>Montant à payer</p>
          <p>{((cours.prix) - ((25 * (cours.prix))/100)).toLocaleString()} Ar</p>
        </div>
        <div>
          <p className="text-xl">Modes de paiement</p>
        </div>
        <div className="bg-white h-16 w-full"></div>
        
                    <Button onClick={handlePayment} 
                    // disabled={isLoading || !phone} 
                    className="w-full rounded bg-orangeme/90 hover:bg-orangeme">
                        {isLoading ? "Traitement..." : "Payer"}
                    </Button>

                    {success && (
                        <p className="text-green-500 text-sm text-center mt-2"><IconCircleDashedCheck /> Paiement initié avec succès !</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>

    );
}
