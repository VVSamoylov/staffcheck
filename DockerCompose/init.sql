
	SET statement_timeout = 0;
	SET lock_timeout = 0;
	SET idle_in_transaction_session_timeout = 0;
	SET client_encoding = 'UTF8';
	SET standard_conforming_strings = on;
	SELECT pg_catalog.set_config('search_path', '', false);
	SET check_function_bodies = false;
	SET xmloption = content;
	SET client_min_messages = warning;
	SET row_security = off;

	SET default_tablespace = '';

	SET default_table_access_method = heap;

	CREATE TABLE public.car (
    	gasoline_norm double precision,
    	odometer double precision,
    	id bigint NOT NULL,
    	car_number character varying(255),
    	model character varying(255)
	);

	CREATE SEQUENCE public.car_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.car_id_seq OWNED BY public.car.id;

	CREATE TABLE public.departament (
    	boss_id bigint,
    	id bigint NOT NULL,
    	dep_name character varying(255)
	);

	CREATE SEQUENCE public.departament_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.departament_id_seq OWNED BY public.departament.id;

	CREATE TABLE public.employee (
    	departament_id bigint,
    	id bigint NOT NULL,
    	position_id bigint,
    	workschedule_id bigint,
    	card_number character varying(255),
    	driver_license character varying(255),
    	first_name character varying(255),
    	last_name character varying(255),
    	middle_name character varying(255),
    	snils character varying(255),
    	active boolean
	);

	CREATE SEQUENCE public.employee_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;

	CREATE TABLE public.event (
    	date_time timestamp(6) without time zone NOT NULL,
    	card_no character varying(255),
    	device_name character varying(255),
    	message character varying(255),
    	org_name character varying(255),
    	table_no character varying(255),
    	employee_id bigint,
    	id bigint NOT NULL,
    	editor_date_time timestamp(6) without time zone,
    	editor_name character varying(255)
	);

	CREATE SEQUENCE public.event_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;

	CREATE TABLE public.interval_work_day (
    	id bigint NOT NULL,
    	duty_sait integer,
    	duty_social integer
	);

	CREATE TABLE public.issuance_task (
    	date date,
    	end_time time(6) without time zone,
    	start_time time(6) without time zone,
    	id bigint NOT NULL,
    	workplace_id bigint,
    	project character varying(255)
	);

	CREATE SEQUENCE public.issuance_task_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.issuance_task_id_seq OWNED BY public.issuance_task.id;

	CREATE TABLE public.list_daysaite (
    	employee_id bigint NOT NULL,
    	planetv_id bigint NOT NULL
	);

	CREATE TABLE public.list_duty (
    	employee_id bigint NOT NULL,
    	planetv_id bigint NOT NULL
	);

	CREATE TABLE public.list_dutysocial (
    	planetv_id bigint NOT NULL,
    	employee_id bigint NOT NULL
	);
	
	CREATE TABLE public.list_task_corespondents (
    	corespondemt_id bigint NOT NULL,
    	task_id bigint
	);  

	CREATE TABLE public.list_task_staff (
    	employee_id bigint NOT NULL,
    	issuance_task_id bigint NOT NULL
	);

	CREATE TABLE public.notworking (
    	begin_date date,
    	end_date date,
    	work_day integer,
    	employee_id bigint,
    	id bigint NOT NULL,
    	type_name character varying(255)
	);

	CREATE SEQUENCE public.notworking_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.notworking_id_seq OWNED BY public.notworking.id;
	
	CREATE TABLE public.planetask (
    	end_time time(6) without time zone,
    	start_time time(6) without time zone,
    	id bigint NOT NULL,
    	manager_id bigint,
    	plane_tv_id bigint,
    	transportexit_id bigint,
    	transportstart_id bigint,
    	description character varying(255),
    	shooting_location character varying(255),
    	title character varying(255),
    	type character varying(255),
    	progress character varying(255),
    	CONSTRAINT planetask_progress_check CHECK (((progress)::text = ANY ((ARRAY['SHOT'::character varying, 'DEVELOP'::character varying, 'DELAY'::character varying, 'MOVE'::character varying, 'CANCELLED'::character varying])::text[]))),
    	CONSTRAINT planetask_type_check CHECK (((type)::text = ANY ((ARRAY['TZ'::character varying, 'RED'::character varying, 'PR'::character varying, 'ALL'::character varying])::text[])))
	);

	CREATE SEQUENCE public.planetask_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.planetask_id_seq OWNED BY public.planetask.id;

	CREATE TABLE public.planetask_operator (
    	operator_id bigint NOT NULL,
    	planetvtask_impl_id bigint
	);

	CREATE TABLE public."position" (
    	id bigint NOT NULL,
    	pos_name character varying(255)
	);

	CREATE SEQUENCE public.position_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.position_id_seq OWNED BY public."position".id;

	CREATE TABLE public.transport (
    	date date,
    	idle_hours double precision,
    	oil_loss double precision,
    	oil_trailer double precision,
    	oill_type smallint,
    	remainder double precision,
    	seasonal_pay double precision,
    	start_kilometrage double precision,
    	work_trailer_hours double precision,
    	working_hours double precision,
    	car_id bigint,
    	employee_id bigint,
    	id bigint NOT NULL,
    	end_kilometerage double precision,
    	oil_input double precision,
    	return_remainder double precision DEFAULT 0,
    	CONSTRAINT transport_oill_type_check CHECK (((oill_type >= 0) AND (oill_type <= 2)))
	);

	CREATE SEQUENCE public.transport_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.transport_id_seq OWNED BY public.transport.id;

	CREATE TABLE public.workplace_issuance (
    	id bigint NOT NULL,
    	work_name character varying(255)
	);

	CREATE SEQUENCE public.workplace_issuance_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.workplace_issuance_id_seq OWNED BY public.workplace_issuance.id;

	CREATE TABLE public.workplanetv (
    	plane_date date,
    	chiefsite_id bigint,
    	daytimetvchef_id bigint,
    	duttytv_id bigint,
    	id bigint NOT NULL,
    	morningtvchef_id bigint,
    	plane_name character varying(255)
	);

	CREATE SEQUENCE public.workplanetv_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.workplanetv_id_seq OWNED BY public.workplanetv.id;

	CREATE TABLE public.workschedule (
    	id bigint NOT NULL,
    	schedule_name character varying(255)
	);

	CREATE SEQUENCE public.workschedule_id_seq
    	START WITH 1
    	INCREMENT BY 1
    	NO MINVALUE
    	NO MAXVALUE
    	CACHE 1;

	ALTER SEQUENCE public.workschedule_id_seq OWNED BY public.workschedule.id;

	ALTER TABLE ONLY public.car ALTER COLUMN id SET DEFAULT nextval('public.car_id_seq'::regclass);

	ALTER TABLE ONLY public.departament ALTER COLUMN id SET DEFAULT nextval('public.departament_id_seq'::regclass);

	ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);

	ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);

	ALTER TABLE ONLY public.issuance_task ALTER COLUMN id SET DEFAULT nextval('public.issuance_task_id_seq'::regclass);

	ALTER TABLE ONLY public.notworking ALTER COLUMN id SET DEFAULT nextval('public.notworking_id_seq'::regclass);

	ALTER TABLE ONLY public.planetask ALTER COLUMN id SET DEFAULT nextval('public.planetask_id_seq'::regclass);

	ALTER TABLE ONLY public."position" ALTER COLUMN id SET DEFAULT nextval('public.position_id_seq'::regclass);

	ALTER TABLE ONLY public.transport ALTER COLUMN id SET DEFAULT nextval('public.transport_id_seq'::regclass);

	ALTER TABLE ONLY public.workplace_issuance ALTER COLUMN id SET DEFAULT nextval('public.workplace_issuance_id_seq'::regclass);

	ALTER TABLE ONLY public.workplanetv ALTER COLUMN id SET DEFAULT nextval('public.workplanetv_id_seq'::regclass);

	ALTER TABLE ONLY public.workschedule ALTER COLUMN id SET DEFAULT nextval('public.workschedule_id_seq'::regclass);

	SELECT pg_catalog.setval('public.car_id_seq', 1, true);

	SELECT pg_catalog.setval('public.departament_id_seq', 1, true);

	SELECT pg_catalog.setval('public.employee_id_seq', 1, true);

	SELECT pg_catalog.setval('public.event_id_seq', 1, true);

	SELECT pg_catalog.setval('public.issuance_task_id_seq', 1, true);

	SELECT pg_catalog.setval('public.notworking_id_seq', 1, true);

	SELECT pg_catalog.setval('public.planetask_id_seq', 1, true);

	SELECT pg_catalog.setval('public.position_id_seq', 1, true);

	SELECT pg_catalog.setval('public.transport_id_seq', 1, true);

	SELECT pg_catalog.setval('public.workplace_issuance_id_seq', 1, true);

	SELECT pg_catalog.setval('public.workplanetv_id_seq', 1, true);

	SELECT pg_catalog.setval('public.workschedule_id_seq', 1, true);

	ALTER TABLE ONLY public.car ADD CONSTRAINT car_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.departament ADD CONSTRAINT departament_pkey PRIMARY KEY (id);
    
    ALTER TABLE public.departament ADD CONSTRAINT departament_unique UNIQUE (dep_name);

	ALTER TABLE ONLY public.employee ADD CONSTRAINT employee_pkey PRIMARY KEY (id);

    ALTER TABLE public.employee ADD CONSTRAINT employee_unique UNIQUE (snils);

	ALTER TABLE ONLY public.event ADD CONSTRAINT event_pk PRIMARY KEY (id);

	ALTER TABLE ONLY public.interval_work_day  ADD CONSTRAINT interval_work_day_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.issuance_task   ADD CONSTRAINT issuance_task_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.list_daysaite   ADD CONSTRAINT list_daysaite_pkey PRIMARY KEY (employee_id, planetv_id);

	ALTER TABLE ONLY public.list_duty   ADD CONSTRAINT list_duty_pkey PRIMARY KEY (employee_id, planetv_id);

	ALTER TABLE ONLY public.list_dutysocial   ADD CONSTRAINT list_dutysocial_pkey PRIMARY KEY (planetv_id, employee_id);

	ALTER TABLE ONLY public.list_task_staff   ADD CONSTRAINT list_task_staff_pkey PRIMARY KEY (employee_id, issuance_task_id);

	ALTER TABLE ONLY public.notworking   ADD CONSTRAINT notworking_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.planetask   ADD CONSTRAINT planetask_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public."position"   ADD CONSTRAINT position_pkey PRIMARY KEY (id);

    ALTER TABLE public."position" ADD CONSTRAINT position_unique UNIQUE (pos_name);

	ALTER TABLE ONLY public.transport   ADD CONSTRAINT transport_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.event  ADD CONSTRAINT ukidbtaq3t9miqfui4mf4r1wfi7 UNIQUE (date_time, device_name);

	ALTER TABLE ONLY public.workplace_issuance   ADD CONSTRAINT workplace_issuance_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.workplanetv   ADD CONSTRAINT workplanetv_pkey PRIMARY KEY (id);

	ALTER TABLE ONLY public.workschedule  ADD CONSTRAINT workschedule_pkey PRIMARY KEY (id);

    ALTER TABLE public.workschedule ADD CONSTRAINT workschedule_unique UNIQUE (schedule_name);

	ALTER TABLE ONLY public.list_daysaite  ADD CONSTRAINT fk1sv5kqaf622hmslsnexih9xf6 FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.planetask  ADD CONSTRAINT fk36jr5u4o76i7cvbjukvyc438y FOREIGN KEY (plane_tv_id) REFERENCES public.workplanetv(id) ON UPDATE SET NULL;

	ALTER TABLE ONLY public.transport   ADD CONSTRAINT fk3c47clr7v4ek42jvyoawp16rx FOREIGN KEY (employee_id) REFERENCES public.employee(id);	

	ALTER TABLE ONLY public.workplanetv   ADD CONSTRAINT fk3dvmpab2a7lnys8srdr17o57e FOREIGN KEY (duttytv_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.planetask_operator  ADD CONSTRAINT fk3qw34323nlelegxn7f5f8ivh7 FOREIGN KEY (planetvtask_impl_id) REFERENCES public.planetask(id) ON DELETE SET NULL;

	ALTER TABLE ONLY public.list_duty  ADD CONSTRAINT fk4d4vgupge9ifqoqm9skrk496f FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.event  ADD CONSTRAINT fk4fhn6ne4sxev3wa0enub13j7 FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.planetask  ADD CONSTRAINT fk4uyensb8t70w1l21fidv3l6m3 FOREIGN KEY (transportexit_id) REFERENCES public.transport(id) ON UPDATE SET NULL;

	ALTER TABLE ONLY public.issuance_task  ADD CONSTRAINT fk4yabknocu5kdpv3up4swb9rx2 FOREIGN KEY (workplace_id) REFERENCES public.workplace_issuance(id) ON DELETE SET NULL;

	ALTER TABLE ONLY public.departament  ADD CONSTRAINT fk5nani5lwv56mym10f12anlirj FOREIGN KEY (boss_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.list_daysaite  ADD CONSTRAINT fk5opa4wowe3q8ma16ii3rwcc3y FOREIGN KEY (planetv_id) REFERENCES public.workplanetv(id);

	ALTER TABLE ONLY public.employee  ADD CONSTRAINT fk82stsynrdyg6p7ue72vi8a2be FOREIGN KEY (workschedule_id) REFERENCES public.workschedule(id);

	ALTER TABLE ONLY public.notworking  ADD CONSTRAINT fk9l24fj89j93m0109nt5jp317d FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.employee  ADD CONSTRAINT fkbc8rdko9o9n1ri9bpdyxv3x7i FOREIGN KEY (position_id) REFERENCES public."position"(id);

	ALTER TABLE ONLY public.list_task_corespondents  ADD CONSTRAINT fkdim4a2sg8a8tryttyg2483s50 FOREIGN KEY (task_id) REFERENCES public.planetask(id) ON DELETE SET NULL;

	ALTER TABLE ONLY public.workplanetv  ADD CONSTRAINT fkdl99d8f5t70f1c6eu61fqsdpg FOREIGN KEY (morningtvchef_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.list_dutysocial   ADD CONSTRAINT fkgax4cn0an592px1oo4xhkcxhx FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.list_task_corespondents  ADD CONSTRAINT fkgligxpbrcrkigoyuw4khvxdia FOREIGN KEY (corespondemt_id) REFERENCES public.employee(id) ON DELETE SET NULL;

	ALTER TABLE ONLY public.employee  ADD CONSTRAINT fkgxcuqmdwlbwqw3jijnedgkp7d FOREIGN KEY (departament_id) REFERENCES public.departament(id);

	ALTER TABLE ONLY public.list_duty  ADD CONSTRAINT fkj5yd2ma0mpsqb7bsu3p821ieh FOREIGN KEY (planetv_id) REFERENCES public.workplanetv(id);

	ALTER TABLE ONLY public.transport  ADD CONSTRAINT fklp5kg96k11839jw6iyxpi1wyq FOREIGN KEY (car_id) REFERENCES public.car(id);

	ALTER TABLE ONLY public.list_task_staff  ADD CONSTRAINT fkm0ic182uh2ggjce47nswutgj5 FOREIGN KEY (employee_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.workplanetv  ADD CONSTRAINT fkm0s28k45cbimhky4rpgwe6bnp FOREIGN KEY (daytimetvchef_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.list_task_staff  ADD CONSTRAINT fkm2kqxe64dqakq2xg3up9updfm FOREIGN KEY (issuance_task_id) REFERENCES public.issuance_task(id);

	ALTER TABLE ONLY public.list_dutysocial ADD CONSTRAINT fkp5c97yckq3atpj2nrscrmhxuc FOREIGN KEY (planetv_id) REFERENCES public.workplanetv(id);

	ALTER TABLE ONLY public.planetask ADD CONSTRAINT fkpadrid474atyyq3qklwry6voa FOREIGN KEY (manager_id) REFERENCES public.employee(id) ON UPDATE SET NULL;

	ALTER TABLE ONLY public.workplanetv  ADD CONSTRAINT fks71hs9cwpbnqxxhb05b1kb00i FOREIGN KEY (chiefsite_id) REFERENCES public.employee(id);

	ALTER TABLE ONLY public.planetask_operator  ADD CONSTRAINT fksg9gtqct3kw1q3qii9khki31s FOREIGN KEY (operator_id) REFERENCES public.employee(id) ON DELETE SET NULL;

	ALTER TABLE ONLY public.planetask  ADD CONSTRAINT fktlpfkhtlurwybvxu4rfiy8xj9 FOREIGN KEY (transportstart_id) REFERENCES public.transport(id) ON UPDATE SET NULL;





