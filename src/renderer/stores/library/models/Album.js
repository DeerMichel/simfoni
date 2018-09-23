import { Model, attr, fk } from "redux-orm";

class Album extends Model {}

Album.modelName = "Album";
Album.fields = {
    name: attr(),
    artist: fk("Artist", "albums"),
};

export default Album;
