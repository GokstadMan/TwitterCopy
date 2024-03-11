"use client";

import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import PageTitle from "@/components/PageTitle";


export default function Notifications () {

    const queryClient = useQueryClient();

    const getNotifications = useQuery({
        queryKey: ['notifications'],
        queryFn: api.getNotifications
    });

    const readNotifications = useMutation({
        mutationFn: api.readNotifications,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] })
    });

    useEffect(() => {
        readNotifications.mutate();
    }, [])

    return (
        <>
            <PageTitle pageTitle="Notifications" />
            {getNotifications.isSuccess ? (
                <>
                    {getNotifications.data.map((notification:any, index:any) => (
                        <div className="p-4 border-b-2 border-gray-300">
                            {notification.content}
                        </div>
                    ))}
                </>
            ) : null}
        </>
    );
}