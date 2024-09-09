import React from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const Vote = () => {
  return (
    <main className="flex-1 p-4 sm:p-6">
      <section>
        <h1 className="text-2xl font-bold">Cast Your Vote</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidate A</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                <RadioGroupItem value="a" id="a" className="peer sr-only" />
                <Label
                  htmlFor="a"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background p-4 transition-colors hover:bg-muted"
                >
                  <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  <span>Vote for Candidate A</span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate B</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                <RadioGroupItem value="b" id="b" className="peer sr-only" />
                <Label
                  htmlFor="b"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background p-4 transition-colors hover:bg-muted"
                >
                  <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  <span>Vote for Candidate B</span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate C</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                <RadioGroupItem value="c" id="c" className="peer sr-only" />
                <Label
                  htmlFor="c"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background p-4 transition-colors hover:bg-muted"
                >
                  <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  <span>Vote for Candidate C</span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate D</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                <RadioGroupItem value="d" id="d" className="peer sr-only" />
                <Label
                  htmlFor="d"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background p-4 transition-colors hover:bg-muted"
                >
                  <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  <span>Vote for Candidate D</span>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-primary text-primary-foreground">
            Cast Vote
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Vote;
