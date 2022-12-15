-- Active: 1667960805673@@127.0.0.1@5432
create or replace view jdernier as
select (now() - (interval '1' day * generate_series(0,5)))::date as d;
select j.d , (select avg(p.valeur) from parametre_dossier p 
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

select date '2004-03-07' + j - i as AllDate 
from generate_series(0, extract(doy from date '2004-03-07')::int - 1) as i,
     generate_series(0, extract(doy from date '2004-08-16')::int - 1) as j;

-- _____________________________________________________
select 
    concat('03',(2+random()+1)::int,' ',(10 + random()*88+1)::int,' ',(100 +random()*898+1)::int,' '
		   ,' ',(10 + (random()*88+1))::int) as contact;

insert into personne(cin,  genre , groupe_sanguin , nom , prenom , date_naissance)
select
    concat(99+(random()+3)::int,' ',(390+random()+1)::int,' ',(random()*1000)::int,' '
		   ,' ',(random()*1000)::int) as cin,
	case when ((random() * 10)::int)<5 then 'M'
        else 'F' end as genre,
    case when ((random() * 10)::int)<3 then 'A'
        when ((random() * 10)::int)>4 and ((random() * 10)::int)<8 then 'B' end as groupe_sanguin,
	left(md5(random()::text), 9) as nom,
	left(md5(random()::text), 9) as prenom,
    date(concat(1950+(random()*50+1)::int,'-',(random()*11+1)::int,'-',(random()*27+1)::int)) as date_naissance
from generate_series(1, 300);

create view "v_patient_list" as
select ptd.id_patient_dossier id, ptd.id_patient_dossier,ptd.id_personne,
ptd.id_etablissement, ptd.id_type_transport, ptd.numero_dossier,
ptd.contact,  ptd.adresse ,  ptd.motif, ptd.date_admission,
p.nom, p.prenom, p.date_naissance, p.cin, p.genre,p.groupe_sanguin
from patient_dossier ptd
join personne p on ptd.id_personne=p.id_personne;

insert into patient_dossier (adresse , contact , date_admission, motif, numero_dossier,id_etablissement,id_personne , id_type_transport)
select
    left(md5(random()::text), 5) as adresse,
    concat('03',(2+random()+1)::int,' ',(10 + random()*88+1)::int,' ',(100 +random()*898+1)::int,' '
		   ,' ',(10 + (random()*88+1))::int) as contact,
    date(concat(2018+(random()*3+1)::int,'-',(random()*11+1)::int,'-',(random()*27+1)::int,' ',(random()*22+1)::int,':',(random()*55+1)::int,':',(random()*55+1)::int)) as date_admission,
    case when ((random() * 10)::int)<5 then 'Urgence'
        else 'Consultation externe'
        end as motif ,
    concat('CHU-',row_number() over(), date_part('year', now())) as numero_dossier, 
    1 as id_etablissement,
    (3 +random()*290+1)::int as id_personne,
    1 as type_transport
from generate_series(1, 20);

insert into parametre_dossier(date_parametre, valeur , id_parametre , id_patient_dossier)
select 
    date(concat(2022,'-',11,'-',(20 + random()*9+1)::int)) as date_parametre ,
    (50 + random()*10)::int as valeur,
    (random()*2+1)::int as id_parametre,
    502 as id_patient_dossier
from generate_series(0,50);

insert into utilisateur(password, username , id_personne, id_role) values("$2a$12$nOZ3fbCJuOycchtKPMY/A..rwSW6lyLW9yKwu0SAOvgbSbUpTGxde","test",2,2);


select coalesce(total,0) 
from stat_jour 
    where y=date_part('year',now())
        and m=date_part('month',now())
        and d=date_part('day',now()) and id_etablissement = 1;
select count(id) as total
from v_patient_list 
where 
    date_part('year' ,date_admission) = date_part('year' , now()) and 
    date_part('month' ,date_admission) = date_part('month' , now()) and
    date_part('day' ,date_admission) = date_part('day' , now())
    and id_etablissement =1;

// export const date_now = moment().toISOString().slice(0, 16);
select count(id) as total
from v_patient_list 
where date_part('year' ,date_admission) = date_part('year' , now()) and     date_part('month' ,date_admission) = date_part('month' , now()) and id_etablissement =1;

select * from parametre_dossier where id_patient_dossier=56
ORDER BY date_parametre DESC;
