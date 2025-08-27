/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useAstro } from "../hooks/astro";
import type { Astro } from "../models/Astro";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";

export const Home = () => {

    const astroHook = useAstro();

    const { coords } = useGeolocated()

    const [astro, setAstro] = useState<Astro>({} as Astro)


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Astro>()

    const { mutate, isPending } = useMutation({
        mutationKey: ['astro', astro],
        mutationFn: async (astro: Astro) => (await astroHook.buscar(astro)),
        onSuccess: (data: Astro) => {
            setAstro(data)
            reset();
        }
    })

    const onSubmit = (astro: Astro) => {
        console.log(astro)
        astro.latitude = coords?.latitude
        astro.longitude = coords?.longitude
        mutate(astro)
    }

    return <div>
        <nav className="bg-blue-500 p-4">
            <div className="w-10/12 mx-auto text-white font-bold">
                Innova Astro {coords && <>{coords.latitude} / {coords.longitude}</>}
            </div>
        </nav>
        <div className="h-screen flex flex-col gap-4 py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 mx-auto flex flex-col gap-4">
                {/* <img src={`${environment.apiUrl}stream`} className="w-50" /> */}
                <label>Nome do Astro</label>
                <input
                    type="text"
                    className="border border-gray-100 p-2"
                    {...register('name', { required: true })} />
                {errors.name && <span>Este campo é obrigatório</span>}
                {!isPending && <div className="flex flex-col gap-4">
                    <div><b>Nome</b>: {astro.name} </div>
                    <div><b>Lat</b>: {astro.latitude}</div>
                    <div><b>Lng</b>: {astro.latitude}</div>
                    <div><b>AZ</b>: {astro.az}</div>
                    <div><b>ALT</b>: {astro.alt}</div>
                </div>}
                <div>
                    <button
                        type={!isPending ? 'submit' : 'button'}
                        disabled={isPending}
                        className="bg-blue-900 text-white p-2 rounded">
                        {isPending ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
            </form>
        </div>
    </div>
}