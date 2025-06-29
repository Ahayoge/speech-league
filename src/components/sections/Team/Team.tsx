import s from "./Team.module.css";

import TeamCard from "@ui/TeamCard/TeamCard";
import { TeamCardType } from "../../../types/types";
import { AxiosResponse } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";
import { api } from "@api/BaseUrl";


const Team = () => {
    const [team, setTeam] = useState([]);

    const getTeamData = () => {
        api
            .get("/team")
            .then((response: AxiosResponse) => {

                setTeam(response.data);
            });
    };

    useEffect(() => {
        getTeamData();
    }, []);
    return (
        <section className="section">
            <h2 className={s.title}>Команда Лиги Речи</h2>
            {team.length < 4 ? (
                <ul className={`flex ${s.list}`}>
                    {team.map((card: TeamCardType) => {
                        return <TeamCard className="width345" card={card} />;
                    })}
                </ul>
            ) : (
                <div className={s.wrap}>
                    <Swiper
                        className={s.mySwiper}
                        spaceBetween={30}
                        slidesPerView={3}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {team.map((card: TeamCardType) => {
                            return (
                                <SwiperSlide>
                                    <TeamCard card={card} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}
        </section>
    );
};

export default Team;
