-- Active: 1667960805673@@127.0.0.1@5432@test_db_spring
create or replace view jdernier as
select (now() - (interval '1' day * generate_series(0,5)))::date as d;

select j.d  , 
(select avg(p.valeur) from parametre_dossier p 
where p.date_parametre::date = j.d and p.id_parametre = 1 and p.id_patient_dossier = 1)
from (select (now() - (interval '1' day * generate_series(0,4)))::date as d) j;

select avg(p.valeur) from parametre_dossier p 
where p.date_parametre::date = (select (now() - (interval '1' day * generate_series(0,4)))::date )
and p.id_parametre = 1 and p.id_patient_dossier = 1;


select jj.id_parametre , jj.id_patient_dossier , dd.d date_parametre, jj.valeur
from (select ('2022-11-24'::date - (interval '1' day * generate_series(0,4)))::date as d ) dd
left join 
(SELECT id_parametre,id_patient_dossier, date_parametre::date, avg(valeur) valeur
FROM parametre_dossier where id_parametre = 1
group by id_parametre , id_patient_dossier , date_parametre::date ) jj  on dd.d = jj.date_parametre;

create view parametre_dossier
select id_parametre_dossier,date(date_parametre), valeur , id_parametre , id_patient_dossier from parametre_dossier ;

select jj.id_parametre_dossier , jj.id_parametre , jj.id_patient_dossier , dd.d date_parametre, jj.valeur
from (select ('2022-11-24'::date - (interval '1' day * generate_series(0,4)))::date as d ) dd
left join 
(SELECT row_number() over() as id_parametre_dossier, id_parametre,id_patient_dossier,
date(date_parametre) as date_parametre, avg(valeur) as valeur 
FROM parametre_dossier
group by id_parametre , id_patient_dossier , date(date_parametre)) jj  on dd.d = jj.date_parametre;

select jj.valeur 
from (select (date(now()) - (interval '1' day * generate_series(0, (5-1) ))) as d ) dd
left join (SELECT id_parametre,id_patient_dossier,
date(date_parametre) as date_parametre, avg(valeur) as valeur 
FROM parametre_dossier where id_patient_dossier = 1 and id_parametre = 1
group by id_parametre , id_patient_dossier , date(date_parametre)) jj  on dd.d = jj.date_parametre;
