-- Table: public.livro

-- DROP TABLE public.livro;

CREATE TABLE public.livro
(
    id integer NOT NULL DEFAULT nextval('livro_id_seq'::regclass),
    titulo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    autor character varying(255) COLLATE pg_catalog."default" NOT NULL,
    npag smallint,
    ano integer,
    CONSTRAINT livro_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.livro
    OWNER to postgres;