
import { Router } from 'express';
import Joi from 'joi';
import { createValidator, ValidatedRequest,ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { v4 as uuidv4 } from 'uuid';

type TUser = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

const userPostSchema = Joi.object<TUser>({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean(),
});

const UserUpdateSchema = userPostSchema.fork(
    ['login', 'password', 'age', 'isDeleted'],
    (schema) => schema.optional(),
);

interface UseReausetSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: TUser;
};

const validator = createValidator();
let data: TUser[] = [];

export default Router()
    .get('/', (req, res) => {
        const {login = '', limit = data.length} = req.body;
        const filtered =  data.filter((el) => el.login.includes(login)).slice(0, limit);
        res.status(200).json(filtered); 
    })
    .get('/:id', (req, res) => {
        const found = data.find((item) => item.id === req.params.id);
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(404).send('user not found');
        }
    })
    .post('/', validator.body(userPostSchema), (req: ValidatedRequest<UseReausetSchema>, res) => {
        const newItem = {
            id: uuidv4(),
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted:  req.body.isDeleted ?? false,
        };
        data.push(newItem);
        res.status(201).json(newItem);
    })
    .put('/:id', validator.body(UserUpdateSchema), (req: ValidatedRequest<UseReausetSchema>, res) => {
        const targetIndex = data.findIndex((item) => item.id === req.params.id);

        if (targetIndex >= 0) {
            const newItem = {
                id: req.body.id,
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isDeleted: req.body.isDeleted ?? false,
            };
            data.splice(targetIndex, 1, newItem);
            res.sendStatus(204);
        } else {
            res.sendStatus(404).send('user not found');
        }
    })
    .delete('/:id', (req, res) => {
        data.every((item) => {
            if (item.id === req.params.id){
                item.isDeleted = true;
                return false;    
            }
            return true;
        });
        res.sendStatus(204);
    });
