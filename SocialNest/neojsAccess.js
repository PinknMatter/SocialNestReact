const neo4j = require("neo4j-driver");

class neojsAccess {
  constructor(user, uri, password) {
    this.user = user;
    this.uri = uri;
    this.password = password;

    this.getAllNodes = async function () {
      console.log(uri);
      const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

      const session = driver.session();
      try {
        let result = await session.run(`MATCH (n) RETURN n`);
        console.log(result);
        return result.records;
      } catch (e) {
        console.log(e);
        console.log("Error in getAllNodes");
      } finally {
        session.close();
      }

      await driver.close();
    };

    this.addNewPerson = async function () {
      const driver = neo4j.driver(
        uri,
        neo4j.auth.basic(this.user, this.password)
      );
      const session = driver.session();

      //const personName = 'Marianne'

      try {
        const result = await session.run(
          "MERGE (a:Person {personID:$id, `First Name` : $name_f, `Last Name` : $name_l }) RETURN a",
          { name_f: "Noah", name_l: "Kornberg", id: 10 }
        );
      } finally {
        await session.close();
      }

      // on application exit:
      await driver.close();
    }; //add new person

    this.fetchGraphData = async function () {
      const driver = neo4j.driver(
        uri,
        neo4j.auth.basic(this.user, this.password)
      );
      const session = driver.session();
      try {
        const result = await session.run(`MATCH (n)-[r]->(m) RETURN n,r,m`);

        return { result };
      } finally {
        await session.close();
      }
    };

    this.addRelationship = async function (
      person1FirstName,
      person1LastName,
      person2FirstName,
      person2LastName
    ) {
      const driver = neo4j.driver(
        uri,
        neo4j.auth.basic(this.user, this.password)
      );
      const session = driver.session();

      console.log(
        person1FirstName,
        person1LastName,
        person2FirstName,
        person2LastName
      );

      const person1 = {
        name_f: person1FirstName,
        name_l: person1LastName,
        id: 12,
      };
      const person2 = {
        name_f: person2FirstName,
        name_l: person2LastName,
        id: 13,
      };
      const relationshipType = "FRIENDS_WITH";

      try {
        const result = await session.run(
          "MERGE (a:Person {personID: $id1, `First Name`: $name_f1, `Last Name`: $name_l1}) " +
            "MERGE (b:Person {personID: $id2, `First Name`: $name_f2, `Last Name`: $name_l2}) " +
            "MERGE (a)-[r1:" +
            relationshipType +
            "]->(b) " +
            "MERGE (b)-[r2:" +
            relationshipType +
            "]->(a) " +
            "RETURN a, b, r1, r2",
          {
            id1: person1.id,
            name_f1: person1.name_f,
            name_l1: person1.name_l,
            id2: person2.id,
            name_f2: person2.name_f,
            name_l2: person2.name_l,
          }
        );

        console.log(result.records);
        console.log("Successfully added relationship");
      } finally {
        await session.close();
      }

      // On application exit:
      await driver.close();
    };
  }
}
module.exports = neojsAccess;
